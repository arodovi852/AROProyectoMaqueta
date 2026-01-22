import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardProfile } from '../../components/shared/card-profile/card-profile';
import { StatBar } from '../../components/shared/stat-bar/stat-bar';
import { CardData } from '../../components/shared/card-data/card-data';
import { Card } from '../../components/shared/card/card';
import { CardList } from '../../components/shared/card-list/card-list';
import { CardReview } from '../../components/shared/card-review/card-review';

/**
 * Other Profile Page
 * 
 * Static profile page for viewing other users' profiles.
 * Accessible from reviews on series pages.
 * Data is read-only and cannot be modified.
 * 
 * Supported users: user1, user2, user3
 */

interface UserProfile {
  username: string;
  avatarColor: string;
  watched: number;
  saved: number;
  average: number;
  statsBars: number[];
  loggedSeries: { id: number; title: string; imageSrc: string; hoverTitle: string }[];
  recentlyWatched: { id: number; title: string; imageSrc: string; hoverTitle: string; rating?: number }[];
  savedLists: { id: string; title: string; images: { src: string; alt: string }[] }[];
  reviews: { username: string; rating: number; reviewText: string }[];
}

@Component({
  selector: 'app-other-profile',
  imports: [CommonModule, CardProfile, StatBar, CardData, Card, CardList, CardReview],
  templateUrl: './other-profile.html',
  styleUrl: './other-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherProfile implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Current profile
  currentProfile = signal<UserProfile | null>(null);
  username = signal<string>('User');
  notFound = signal<boolean>(false);
  
  // Statistics
  watched = signal<number>(0);
  saved = signal<number>(0);
  average = signal<number>(0);
  
  // Rating distribution bars
  statsBars = signal<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // Series data
  loggedSeries = signal<{ id: number; title: string; imageSrc: string; hoverTitle: string }[]>([]);
  recentlyWatched = signal<{ id: number; title: string; imageSrc: string; hoverTitle: string; rating?: number }[]>([]);
  savedLists = signal<{ id: string; title: string; images: { src: string; alt: string }[] }[]>([]);
  reviews = signal<{ username: string; rating: number; reviewText: string }[]>([]);

  // Static user profiles data - Using actual series from the app
  private readonly userProfiles: Record<string, UserProfile> = {
    'user1': {
      username: 'User1',
      avatarColor: '#6b5b7a',
      watched: 5,
      saved: 3,
      average: 4.2,
      statsBars: [0, 5, 10, 20, 25, 35, 40, 45, 30, 20],
      loggedSeries: [
        { id: 3, title: 'Alien: Earth', imageSrc: '/assets/Image_For_Card_3.jpg', hoverTitle: 'Alien: Earth (2025)' },
        { id: 7, title: 'It: Welcome to Derry', imageSrc: '/assets/Images_For_Card_7.png', hoverTitle: 'It: Welcome to Derry (2025)' },
      ],
      recentlyWatched: [
        { id: 1, title: 'Twin Peaks', imageSrc: '/assets/Images_For_Card_1.jpg', hoverTitle: 'Twin Peaks (1990)', rating: 3 },
        { id: 2, title: 'Stranger Things', imageSrc: '/assets/Images_For_Card_2.jpg', hoverTitle: 'Stranger Things (2016)', rating: 4.5 },
        { id: 4, title: 'The Haunting of Hill House', imageSrc: '/assets/Image_For_Card_4.jpg', hoverTitle: 'The Haunting of Hill House (2018)', rating: 5 },
        { id: 9, title: 'Black Mirror', imageSrc: '/assets/Images_For_Card_9.jpg', hoverTitle: 'Black Mirror (2011)', rating: 4 },
        { id: 6, title: 'Breaking Bad', imageSrc: '/assets/Image_For_Card_6.jpg', hoverTitle: 'Breaking Bad (2008)', rating: 4.5 },
      ],
      savedLists: [
        { id: 'horror', title: 'Horror Classics', images: [{ src: '/assets/Images_For_Card_1.jpg', alt: 'Twin Peaks' }, { src: '/assets/Image_For_Card_4.jpg', alt: 'Hill House' }] },
      ],
      reviews: [
        { username: 'User1', rating: 3, reviewText: 'Twin Peaks starts strong but the middle drags a bit. The finale is worth it though.' },
        { username: 'User1', rating: 5, reviewText: 'The Haunting of Hill House is terrifying. The hidden ghosts in every scene add so much rewatch value.' },
        { username: 'User1', rating: 4.5, reviewText: 'Stranger Things perfectly captures 80s nostalgia with genuinely scary moments.' },
      ]
    },
    'user2': {
      username: 'User2',
      avatarColor: '#ecc332',
      watched: 6,
      saved: 4,
      average: 4.5,
      statsBars: [0, 0, 5, 10, 15, 25, 40, 50, 45, 35],
      loggedSeries: [
        { id: 10, title: 'The Creep Tapes', imageSrc: '/assets/Images_For_Card_10.jpg', hoverTitle: 'The Creep Tapes (2025)' },
        { id: 3, title: 'Alien: Earth', imageSrc: '/assets/Image_For_Card_3.jpg', hoverTitle: 'Alien: Earth (2025)' },
      ],
      recentlyWatched: [
        { id: 6, title: 'Breaking Bad', imageSrc: '/assets/Image_For_Card_6.jpg', hoverTitle: 'Breaking Bad (2008)', rating: 5 },
        { id: 9, title: 'Black Mirror', imageSrc: '/assets/Images_For_Card_9.jpg', hoverTitle: 'Black Mirror (2011)', rating: 4.5 },
        { id: 8, title: 'Buffy the Vampire Slayer', imageSrc: '/assets/Images_For_Card_8.png', hoverTitle: 'Buffy the Vampire Slayer (1997)', rating: 4 },
        { id: 1, title: 'Twin Peaks', imageSrc: '/assets/Images_For_Card_1.jpg', hoverTitle: 'Twin Peaks (1990)', rating: 4 },
        { id: 5, title: 'The Walking Dead', imageSrc: '/assets/Image_For_Card_5.jpg', hoverTitle: 'The Walking Dead (2010)', rating: 3.5 },
        { id: 12, title: "JoJo's Bizarre Adventure", imageSrc: '/assets/Images_For_Card_12.jpg', hoverTitle: "JoJo's Bizarre Adventure (2012)", rating: 5 },
      ],
      savedLists: [
        { id: 'sci-fi', title: 'Sci-Fi & Thriller', images: [{ src: '/assets/Images_For_Card_9.jpg', alt: 'Black Mirror' }, { src: '/assets/Image_For_Card_6.jpg', alt: 'Breaking Bad' }] },
      ],
      reviews: [
        { username: 'User2', rating: 4, reviewText: 'Excellent series, highly recommended. The plot hooks you from the first episode.' },
        { username: 'User2', rating: 5, reviewText: 'Breaking Bad is a masterclass in character development. Walter White\'s transformation is unforgettable.' },
        { username: 'User2', rating: 5, reviewText: 'JoJo\'s is pure creative genius. Each part reinvents itself while keeping the core spirit.' },
      ]
    },
    'user3': {
      username: 'User3',
      avatarColor: '#5b8a72',
      watched: 4,
      saved: 2,
      average: 4.6,
      statsBars: [0, 0, 0, 5, 10, 20, 30, 45, 55, 40],
      loggedSeries: [
        { id: 7, title: 'It: Welcome to Derry', imageSrc: '/assets/Images_For_Card_7.png', hoverTitle: 'It: Welcome to Derry (2025)' },
      ],
      recentlyWatched: [
        { id: 1, title: 'Twin Peaks', imageSrc: '/assets/Images_For_Card_1.jpg', hoverTitle: 'Twin Peaks (1990)', rating: 5 },
        { id: 11, title: 'Smiling Friends', imageSrc: '/assets/Images_For_Card_11.jpg', hoverTitle: 'Smiling Friends (2022)', rating: 4.5 },
        { id: 4, title: 'The Haunting of Hill House', imageSrc: '/assets/Image_For_Card_4.jpg', hoverTitle: 'The Haunting of Hill House (2018)', rating: 4.5 },
        { id: 12, title: "JoJo's Bizarre Adventure", imageSrc: '/assets/Images_For_Card_12.jpg', hoverTitle: "JoJo's Bizarre Adventure (2012)", rating: 4.5 },
      ],
      savedLists: [
        { id: 'favorites', title: 'All-Time Favorites', images: [{ src: '/assets/Images_For_Card_1.jpg', alt: 'Twin Peaks' }, { src: '/assets/Images_For_Card_11.jpg', alt: 'Smiling Friends' }] },
      ],
      reviews: [
        { username: 'User3', rating: 5, reviewText: 'A masterpiece of television cinema. David Lynch at his best. The atmosphere is unmatched.' },
        { username: 'User3', rating: 4.5, reviewText: 'Smiling Friends is hilarious and surprisingly wholesome. Perfect absurdist humor.' },
        { username: 'User3', rating: 4.5, reviewText: 'Hill House is the best horror series of the decade. Flanagan knows how to build dread.' },
      ]
    }
  };

  ngOnInit(): void {
    // Get username from route parameters
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      if (userId) {
        this.loadProfile(userId.toLowerCase());
      } else {
        this.notFound.set(true);
      }
    });
  }

  /**
   * Load user profile by ID
   */
  private loadProfile(userId: string): void {
    const profile = this.userProfiles[userId];
    
    if (profile) {
      this.currentProfile.set(profile);
      this.username.set(profile.username);
      this.watched.set(profile.watched);
      this.saved.set(profile.saved);
      this.average.set(profile.average);
      this.statsBars.set(profile.statsBars);
      this.loggedSeries.set(profile.loggedSeries);
      this.recentlyWatched.set(profile.recentlyWatched);
      this.savedLists.set(profile.savedLists);
      this.reviews.set(profile.reviews);
      this.notFound.set(false);
    } else {
      this.notFound.set(true);
    }
  }

  /**
   * Navigate back
   */
  goBack(): void {
    window.history.back();
  }
}
