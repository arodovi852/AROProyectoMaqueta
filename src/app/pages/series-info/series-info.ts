import { Component, Input, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from '../../components/shared/card/card';
import { CardStatReview } from '../../components/shared/card-stat-review/card-stat-review';
import { CardReview } from '../../components/shared/card-review/card-review';
import { Series, SeriesService } from '../../services/series.service';
import { ToastService } from '../../services/toast.service';
import { UserService, TrackedSeries } from '../../services/user.service';

/**
 * Series Info Page (PHASE 4 - Tasks 2, 5)
 * 
 * Detailed series information page with:
 * - Series card
 * - Description
 * - CardStatReview for rating
 * - User reviews
 * 
 * Implements:
 * - Reading route parameters (:id)
 * - Using resolver for data preloading
 * - Loading and error states
 * - Watch Later persistence to Logged Series
 * - Star rating persistence to Recently Watched
 */
@Component({
  selector: 'app-series-info',
  imports: [CommonModule, Card, CardStatReview, CardReview],
  templateUrl: './series-info.html',
  styleUrl: './series-info.scss',
})
export class SeriesInfo implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seriesService = inject(SeriesService);
  private toast = inject(ToastService);
  private userService = inject(UserService);

  // Input from resolver or route parameter (PHASE 4 - Task 2)
  @Input() id?: string;

  // States
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  // Series information
  series = signal<{
    title: string;
    imageSrc: string;
    description: string;
    rating?: number;
    year?: number;
    status?: string;
    seasons?: number;
  }>({
    title: 'Twin Peaks',
    imageSrc: '/assets/Images_For_Card_1.jpg',
    description: 'In 1989, a local logger discovers a naked corpse wrapped in plastic on the bank of a river outside the town of Twin Peaks. When police arrive, the body is identified as high school senior and homecoming queen Laura Palmer.'
  });

  // Statistics for CardStatReview
  statsBars = [25, 35, 50, 65, 80, 95, 90, 75, 55, 40];
  seriesRating = 0;
  isWatchLater = false;

  // Reviews
  reviews = [
    {
      username: 'User1',
      rating: 3,
      reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elit massa, dignissim quis accumsan eu, aliquet sit amet ipsum.'
    },
    {
      username: 'User2',
      rating: 4,
      reviewText: 'Excellent series, highly recommended. The plot hooks you from the first episode.'
    },
    {
      username: 'User3',
      rating: 5,
      reviewText: 'A masterpiece of television cinema. David Lynch at his best.'
    }
  ];

  ngOnInit(): void {
    // Try to get data from resolver first
    this.route.data.subscribe(({ series }) => {
      if (series) {
        this.updateSeriesData(series);
        this.initializeUserState(series.id?.toString() || this.id);
      } else if (this.id) {
        // If no resolver, load by ID
        this.loadSeries(this.id);
        this.initializeUserState(this.id);
      } else {
        // Get ID from route parameters
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.loadSeries(id);
          this.initializeUserState(id);
        }
      }
    });

    // Check for error in navigation state
    const navigation = this.router.getCurrentNavigation();
    const errorMessage = navigation?.extras.state?.['error'];
    if (errorMessage) {
      this.error.set(errorMessage);
      this.toast.error(errorMessage);
    }
  }

  /**
   * Initialize user state (Watch Later, Rating) from UserService
   */
  private initializeUserState(seriesId?: string): void {
    if (!seriesId) return;
    
    const id = parseInt(seriesId, 10);
    
    // Check if series is in Logged Series
    this.isWatchLater = this.userService.isInLoggedSeries(id);
    
    // Check if series has been rated
    const existingRating = this.userService.getSeriesRating(id);
    if (existingRating) {
      this.seriesRating = existingRating;
    }
  }

  /**
   * Load series by ID (PHASE 5 - Task 5)
   */
  private loadSeries(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.seriesService.getSeriesById(id).subscribe({
      next: (series) => {
        this.updateSeriesData(series);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Could not load series');
        this.toast.error('Error loading series information');
      }
    });
  }

  /**
   * Update series data
   */
  private updateSeriesData(data: Series): void {
    this.series.set({
      title: data.title,
      imageSrc: data.imageUrl,
      description: data.description,
      rating: data.rating,
      year: data.year,
      status: data.status,
      seasons: data.seasons
    });
  }

  /**
   * Programmatic navigation - go back to list (PHASE 4 - Task 2)
   */
  goBack(): void {
    this.router.navigate(['/main']);
  }

  /**
   * Handle rating change - saves to Recently Watched (supports half-star ratings)
   */
  onRatingChange(rating: number): void {
    this.seriesRating = rating;
    
    // Get current series data
    const currentSeries = this.series();
    const seriesId = this.id ? parseInt(this.id, 10) : 1;
    
    // Create tracked series object
    const trackedSeries: TrackedSeries = {
      id: seriesId,
      title: currentSeries.title,
      imageSrc: currentSeries.imageSrc,
      hoverTitle: currentSeries.title,
      rating: rating,
      addedAt: new Date()
    };
    
    // Add to recently watched (persists to localStorage)
    this.userService.addToRecentlyWatched(trackedSeries);
    
    // Format rating display (show half stars properly)
    const ratingDisplay = rating % 1 === 0 ? rating.toString() : rating.toFixed(1);
    this.toast.success(`You rated "${currentSeries.title}" with ${ratingDisplay} stars`);
  }

  /**
   * Handle Watch Later toggle - saves to Logged Series
   */
  onWatchLaterToggle(isWatchLater: boolean): void {
    this.isWatchLater = isWatchLater;
    
    // Get current series data
    const currentSeries = this.series();
    const seriesId = this.id ? parseInt(this.id, 10) : 1;
    
    if (isWatchLater) {
      // Create tracked series object
      const trackedSeries: TrackedSeries = {
        id: seriesId,
        title: currentSeries.title,
        imageSrc: currentSeries.imageSrc,
        hoverTitle: currentSeries.title,
        addedAt: new Date()
      };
      
      // Add to logged series (persists to localStorage)
      const added = this.userService.addToLoggedSeries(trackedSeries);
      
      if (added) {
        this.toast.success(`"${currentSeries.title}" added to Logged Series`);
      } else {
        this.toast.info(`"${currentSeries.title}" is already in Logged Series`);
      }
    } else {
      // Remove from logged series
      this.userService.removeFromLoggedSeries(seriesId);
      this.toast.info(`"${currentSeries.title}" removed from Logged Series`);
    }
  }
}
