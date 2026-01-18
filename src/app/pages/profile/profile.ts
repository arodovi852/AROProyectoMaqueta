import { Component, inject, OnInit, signal } from '@angular/core';
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

/**
 * Página Profile (FASE 4 - Tarea 4)
 * 
 * Página de perfil del usuario con estadísticas, series y reseñas.
 * Protegida por authGuard - requiere autenticación.
 */
@Component({
  selector: 'app-profile',
  imports: [CommonModule, CardProfile, StatBar, CardData, Card, CardList, CardReview],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  // Usuario actual
  currentUser = signal<AuthUser | null>(null);
  username = signal<string>('Usuario');
  
  // Estadísticas
  watched = 8;
  saved = 3;
  average = 3.7;
  statsBars = [50, 75, 40, 85, 60, 45, 90, 70];

  // Series loggeadas
  loggedSeries = [
    { title: 'Stranger Things', imageSrc: '/assets/Images_For_Card_2.jpg', hoverTitle: 'Stranger Things' },
    { title: 'Twin Peaks', imageSrc: '/assets/Images_For_Card_1.jpg', hoverTitle: 'Twin Peaks' },
    { title: 'Breaking Bad', imageSrc: '/assets/Image_For_Card_5.jpg', hoverTitle: 'Breaking Bad' },
    { title: 'The Haunting of Hill House', imageSrc: '/assets/Image_For_Card_3.jpg', hoverTitle: 'The Haunting of Hill House' },
    { title: 'The Walking Dead', imageSrc: '/assets/Image_For_Card_4.jpg', hoverTitle: 'The Walking Dead' },
    { title: 'Alien: Earth', imageSrc: '/assets/Image_For_Card_6.jpg', hoverTitle: 'Alien: Earth' },
  ];

  // Series vistas recientemente
  recentlyWatched = [
    { title: 'Stranger Things', imageSrc: '/assets/Images_For_Card_2.jpg', hoverTitle: 'Stranger Things' },
    { title: 'Twin Peaks', imageSrc: '/assets/Images_For_Card_1.jpg', hoverTitle: 'Twin Peaks' },
    { title: 'Breaking Bad', imageSrc: '/assets/Image_For_Card_5.jpg', hoverTitle: 'Breaking Bad' },
    { title: 'The Haunting of Hill House', imageSrc: '/assets/Image_For_Card_3.jpg', hoverTitle: 'The Haunting of Hill House' },
    { title: 'The Walking Dead', imageSrc: '/assets/Image_For_Card_4.jpg', hoverTitle: 'The Walking Dead' },
    { title: 'Alien: Earth', imageSrc: '/assets/Image_For_Card_6.jpg', hoverTitle: 'Alien: Earth' },
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
      reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elit massa, dignissim quis accumsan eu.',
      avatarColor: '#6b5b7a'
    },
    {
      username: 'User2',
      rating: 4,
      reviewText: 'Excelente serie, muy recomendada para los amantes del género.',
      avatarColor: '#ecc332'
    },
    {
      username: 'User3',
      rating: 5,
      reviewText: 'Una obra maestra. La mejor serie que he visto en años.',
      avatarColor: '#6b5b7a'
    }
  ];

  ngOnInit(): void {
    // Obtener usuario actual
    this.authService.currentUser$.subscribe(user => {
      this.currentUser.set(user);
      if (user) {
        this.username.set(user.username);
      }
    });
  }

  /**
   * Cerrar sesión (FASE 4 - Tarea 4)
   */
  logout(): void {
    this.authService.logout();
    this.toast.info('Sesión cerrada correctamente');
    this.router.navigate(['/']);
  }

  /**
   * Navegar a editar perfil
   */
  editProfile(): void {
    this.router.navigate(['/profile/edit']);
  }
}
