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
import { ToastService } from '../../services/toast.service';
import { UserService, TrackedSeries } from '../../services/user.service';

/**
 * Profile Page (PHASE 4 - Task 4)
 * 
 * User profile page with statistics, series and reviews.
 * Protected by authGuard - requires authentication.
 * 
 * Features:
 * - Logged Series: Shows series added via "Watch Later"
 * - Recently Watched: Shows last 6 rated series (most recent first)
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
  private toast = inject(ToastService);
  private userService = inject(UserService);

  // Current user
  currentUser = signal<AuthUser | null>(null);
  username = signal<string>('User');
  
  // Statistics
  watched = signal<number>(0);
  saved = signal<number>(0);
  average = signal<number>(0);
  statsBars = [50, 75, 40, 85, 60, 45, 90, 70];

  // Logged series (from UserService - Watch Later)
  loggedSeries = signal<{ title: string; imageSrc: string; hoverTitle: string }[]>([]);

  // Recently watched series (from UserService - Rated series)
  recentlyWatched = signal<{ title: string; imageSrc: string; hoverTitle: string; rating?: number }[]>([]);

  // Personal lists
  personalLists = [
    {
      title: 'My Favorites',
      images: [
        { src: '/assets/Images_For_Card_1.jpg', alt: 'Twin Peaks' },
        { src: '/assets/Images_For_Card_2.jpg', alt: 'Stranger Things' },
        { src: '/assets/Image_For_Card_3.jpg', alt: 'The Haunting' },
        { src: '/assets/Image_For_Card_4.jpg', alt: 'Walking Dead' }
      ]
    },
    {
      title: 'Watch Later',
      images: [
        { src: '/assets/Images_For_Card_1.jpg', alt: 'Twin Peaks' },
        { src: '/assets/Images_For_Card_2.jpg', alt: 'Stranger Things' },
        { src: '/assets/Image_For_Card_3.jpg', alt: 'The Haunting' },
        { src: '/assets/Image_For_Card_4.jpg', alt: 'Walking Dead' }
      ]
    },
    {
      title: 'Horror',
      images: [
        { src: '/assets/Images_For_Card_1.jpg', alt: 'Twin Peaks' },
        { src: '/assets/Images_For_Card_2.jpg', alt: 'Stranger Things' },
        { src: '/assets/Image_For_Card_3.jpg', alt: 'The Haunting' },
        { src: '/assets/Image_For_Card_4.jpg', alt: 'Walking Dead' }
      ]
    },
    {
      title: 'Sci-Fi',
      images: [
        { src: '/assets/Images_For_Card_1.jpg', alt: 'Twin Peaks' },
        { src: '/assets/Images_For_Card_2.jpg', alt: 'Stranger Things' },
        { src: '/assets/Image_For_Card_3.jpg', alt: 'The Haunting' },
        { src: '/assets/Image_For_Card_4.jpg', alt: 'Walking Dead' }
      ]
    }
  ];

  // Reviews
  reviews = [
    {
      username: 'User1',
      rating: 3,
      reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elit massa, dignissim quis accumsan eu.',
      avatarColor: '#6b5b7a'
    },
    {
      username: 'User2',
      rating: 4,
      reviewText: 'Excellent series, highly recommended for genre lovers.',
      avatarColor: '#ecc332'
    },
    {
      username: 'User3',
      rating: 5,
      reviewText: 'A masterpiece. The best series I\'ve seen in years.',
      avatarColor: '#6b5b7a'
    }
  ];

  constructor() {
    // Effect to reactively update from UserService signals
    effect(() => {
      this.updateLoggedSeries();
      this.updateRecentlyWatched();
      this.updateStatistics();
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
    this.updateStatistics();
  }

  /**
   * Update logged series from UserService
   */
  private updateLoggedSeries(): void {
    const series = this.userService.getLoggedSeries();
    this.loggedSeries.set(series.map(s => ({
      title: s.title,
      imageSrc: s.imageSrc,
      hoverTitle: s.hoverTitle
    })));
  }

  /**
   * Update recently watched from UserService (last 6, most recent first)
   */
  private updateRecentlyWatched(): void {
    const series = this.userService.getRecentlyWatched();
    this.recentlyWatched.set(series.map(s => ({
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
    
    this.saved.set(logged.length);
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
   * Logout (PHASE 4 - Task 4)
   */
  logout(): void {
    this.authService.logout();
    this.toast.info('Session closed successfully');
    this.router.navigate(['/']);
  }

  /**
   * Navigate to edit profile
   */
  editProfile(): void {
    this.router.navigate(['/profile/edit']);
  }
}
