import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAvatar } from '../../components/shared/user-avatar/user-avatar';
import { StatsGraph } from '../../components/shared/stats-graph/stats-graph';
import { StatsCard } from '../../components/shared/stats-card/stats-card';
import { Card } from '../../components/shared/card/card';
import { CardList } from '../../components/shared/card-list/card-list';
import { ReviewCard } from '../../components/shared/review-card/review-card';

/**
 * Página Profile
 * 
 * Página de perfil del usuario con estadísticas, series y reseñas
 */
@Component({
  selector: 'app-profile',
  imports: [CommonModule, UserAvatar, StatsGraph, StatsCard, Card, CardList, ReviewCard],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  username = 'User';
  
  // Estadísticas
  watched = 8;
  saved = 3;
  average = 3.7;
  statsBars = [50, 75, 40, 85, 60, 45, 90, 70];

  // Series loggeadas
  loggedSeries = [
    { title: 'Stranger Things', imageSrc: '/assets/Images_For_Card_2.jpg' },
    { title: 'Twin Peaks', imageSrc: '/assets/Images_For_Card_1.jpg' },
    { title: 'Breaking Bad', imageSrc: '/assets/Image_For_Card_5.jpg' },
    { title: 'The Haunting of Hill House', imageSrc: '/assets/Image_For_Card_3.jpg' },
    { title: 'The Walking Dead', imageSrc: '/assets/Image_For_Card_4.jpg' },
    { title: 'Alien: Earth', imageSrc: '/assets/Image_For_Card_6.jpg' },
  ];

  // Series vistas recientemente
  recentlyWatched = [
    { title: 'Stranger Things', imageSrc: '/assets/Images_For_Card_2.jpg' },
    { title: 'Twin Peaks', imageSrc: '/assets/Images_For_Card_1.jpg' },
    { title: 'Breaking Bad', imageSrc: '/assets/Image_For_Card_5.jpg' },
    { title: 'The Haunting of Hill House', imageSrc: '/assets/Image_For_Card_3.jpg' },
    { title: 'The Walking Dead', imageSrc: '/assets/Image_For_Card_4.jpg' },
    { title: 'Alien: Earth', imageSrc: '/assets/Image_For_Card_6.jpg' },
  ];

  // Listas personales
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
      reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elit massa, dignissim quis accumsan eu, aliquet sit amet ipsum. Nullam eget nulla pretium, lobortis turpis at, consectetur sapien. Duis quis congue tellus.',
      avatarColor: '#6b5b7a'
    },
    {
      username: 'User2',
      rating: 3,
      reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elit massa, dignissim quis accumsan eu, aliquet sit amet ipsum. Nullam eget nulla pretium, lobortis turpis at, consectetur sapien. Duis quis congue tellus.',
      avatarColor: '#ecc332'
    },
    {
      username: 'User3',
      rating: 3,
      reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elit massa, dignissim quis accumsan eu, aliquet sit amet ipsum. Nullam eget nulla pretium, lobortis turpis at, consectetur sapien. Duis quis congue tellus.',
      avatarColor: '#6b5b7a'
    }
  ];
}
