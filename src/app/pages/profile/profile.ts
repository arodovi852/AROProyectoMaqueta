import { Component, inject, OnInit, signal, ChangeDetectionStrategy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardProfile } from '../../components/shared/card-profile/card-profile';
import { StatBar } from '../../components/shared/stat-bar/stat-bar';
import { CardData } from '../../components/shared/card-data/card-data';
import { Card } from '../../components/shared/card/card';
import { CardList } from '../../components/shared/card-list/card-list';
import { CardReview } from '../../components/shared/card-review/card-review';
import { AuthService, AuthUser } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { UserService, TrackedSeries, SavedList } from '../../services/user.service';

/**
 * Profile Page (PHASE 4 - Task 4)
 * 
 * User profile page with statistics, series and reviews.
 * Protected by authGuard - requires authentication.
 * 
 * Features:
 * - Logged Series: Shows series added via "Watch Later"
 * - Recently Watched: Shows all rated series (most recent first, displays first 6 on profile)
 * - Saved Lists: Shows lists saved from /listcontent
 */
@Component({
  selector: 'app-profile',
  imports: [CommonModule, CardProfile, StatBar, CardData, Card, CardList, CardReview],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private userService = inject(UserService);

  // Current user
  currentUser = signal<AuthUser | null>(null);
  username = signal<string>('User');
  
  // Statistics
  watched = signal<number>(0);
  saved = signal<number>(0);
  average = signal<number>(0);
  
  // Rating distribution bars (10 bars for 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5 stars)
  statsBars = signal<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // Logged series (from UserService - Watch Later)
  loggedSeries = signal<{ id: number; title: string; imageSrc: string; hoverTitle: string }[]>([]);

  // Recently watched series (from UserService - Rated series)
  recentlyWatched = signal<{ id: number; title: string; imageSrc: string; hoverTitle: string; rating?: number }[]>([]);
  // Saved lists (from UserService)
  savedLists = signal<{ id: string; title: string; images: { src: string; alt: string }[] }[]>([]);

  // Reviews - Example reviews shown on profile (from other users about series the current user might like)
  reviews = [
    {
      username: 'User1',
      rating: 3,
      reviewText: 'Twin Peaks starts strong but the middle drags a bit. The finale is worth it though.',
      avatarColor: '#6b5b7a'
    },
    {
      username: 'User2',
      rating: 4,
      reviewText: 'Excellent series, highly recommended. The plot hooks you from the first episode.',
      avatarColor: '#ecc332'
    },
    {
      username: 'User3',
      rating: 5,
      reviewText: 'A masterpiece of television cinema. David Lynch at his best. The atmosphere is unmatched.',
      avatarColor: '#5b8a72'
    }
  ];

  constructor() {
    // Effect to reactively update from UserService signals
    effect(() => {
      this.updateLoggedSeries();
      this.updateRecentlyWatched();
      this.updateSavedLists();
      this.updateStatistics();
      this.updateRatingDistribution();
    });
  }

  ngOnInit(): void {
    // Get current user
    this.authService.currentUser$.subscribe(user => {
      this.currentUser.set(user);
      if (user) {
        this.username.set(user.username);
      }
    });

    // Load series data
    this.updateLoggedSeries();
    this.updateRecentlyWatched();
    this.updateSavedLists();
    this.updateStatistics();
    this.updateRatingDistribution();
  }

  /**
   * Update logged series from UserService
   */
  private updateLoggedSeries(): void {
    const series = this.userService.getLoggedSeries();
    this.loggedSeries.set(series.map(s => ({
      id: s.id,
      title: s.title,
      imageSrc: s.imageSrc,
      hoverTitle: s.hoverTitle
    })));
  }

  /**
   * Update recently watched from UserService (all rated series, most recent first)
   * Profile displays first 6, full list available via See More
   */
  private updateRecentlyWatched(): void {
    const series = this.userService.getRecentlyWatched();
    this.recentlyWatched.set(series.map(s => ({
      id: s.id,
      title: s.title,
      imageSrc: s.imageSrc,
      hoverTitle: s.hoverTitle,
      rating: s.rating
    })));
  }

  /**
   * Update statistics based on tracked series
   */
  private updateStatistics(): void {
    const logged = this.userService.getLoggedSeries();
    const watched = this.userService.getRecentlyWatched();
    const lists = this.userService.getSavedLists();
    
    this.saved.set(logged.length + lists.length);
    this.watched.set(watched.length);
    
    // Calculate average rating
    const ratings = watched.filter(s => s.rating).map(s => s.rating!);
    if (ratings.length > 0) {
      const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
      this.average.set(Math.round(avg * 10) / 10);
    } else {
      this.average.set(0);
    }
  }

  /**
   * Update rating distribution from UserService (10 bars for half-star increments)
   * Bars represent: 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5 stars
   */
  private updateRatingDistribution(): void {
    const distribution = this.userService.getRatingDistribution();
    this.statsBars.set(distribution);
  }

  /**
   * Update saved lists from UserService
   */
  private updateSavedLists(): void {
    const lists = this.userService.getSavedLists();
    // Convert SavedList to format expected by CardList component
    this.savedLists.set(lists.map(l => ({
      id: l.id,
      title: l.title,
      images: l.images && l.images.length > 0 
        ? l.images 
        : [{ src: l.bannerImage, alt: l.title }]
    })));
  }

  /**
   * Logout (PHASE 4 - Task 4)
   */
  async logout(): Promise<void> {
    this.authService.logout();
    this.router.navigate(['/']);
    await this.alertService.info('Session closed successfully');
  }

  /**
   * Navigate to edit profile
   */
  editProfile(): void {
    this.router.navigate(['/profile/edit']);
  }

  /**
   * Navigate to see more recently watched
   */
  seeMoreRecentlyWatched(): void {
    this.router.navigate(['/seemore'], { queryParams: { section: 'recently-watched' } });
  }

  /**
   * Navigate to see more logged series
   */
  seeMoreLoggedSeries(): void {
    this.router.navigate(['/seemore'], { queryParams: { section: 'logged-series' } });
  }

  /**
   * Navigate to see more saved lists
   */
  seeMoreSavedLists(): void {
    this.router.navigate(['/seemore'], { queryParams: { section: 'saved-lists' } });
  }
}
