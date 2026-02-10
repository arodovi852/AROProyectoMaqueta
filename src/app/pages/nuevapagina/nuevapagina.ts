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
import { Button } from '../../components/shared/button/button';
import { SeriesService, Series } from '../../services/series.service';
import { ToastService } from '../../services/toast.service';


interface SeriesCard {
  id: number;
  imageSrc: string;
  imageAlt: string;
  hoverTitle: string;
}


@Component({
  selector: 'app-profile',
  imports: [CommonModule, CardProfile, StatBar, CardData, Card, CardList, CardReview],
  templateUrl: './nuevapagina.html',
  styleUrl: './nuevapagina.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NuevaPagina implements OnInit {
    
    private authService = inject(AuthService);
    private router = inject(Router);
    private alertService = inject(AlertService);
    private userService = inject(UserService);

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
    recentlyWatched = signal<{ id: number; title: string; imageSrc: string; hoverTitle: string; rating?: number }[]>([]);


    
constructor() {
        effect(() => {
        this.updateRecentlyWatched();
        });
  }

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

    favorites: SeriesCard[] = [
    {
      id: 1,
      imageSrc: '/assets/Images_For_Card_1.jpg',
      imageAlt: 'Twin Peaks',
      hoverTitle: 'Twin Peaks'
    },
    {
      id: 2,
      imageSrc: '/assets/Images_For_Card_2.jpg',
      imageAlt: 'Stranger Things',
      hoverTitle: 'Stranger Things'
    },
    {
      id: 3,
      imageSrc: '/assets/Image_For_Card_3.jpg',
      imageAlt: 'Alien: Earth',
      hoverTitle: 'Alien: Earth'
    },
    {
      id: 4,
      imageSrc: '/assets/Image_For_Card_4.jpg',
      imageAlt: 'The Haunting of Hill House',
      hoverTitle: 'The Haunting of Hill House'
    },
    {
      id: 5,
      imageSrc: '/assets/Image_For_Card_5.jpg',
      imageAlt: 'The Walking Dead',
      hoverTitle: 'The Walking Dead'
    },
    {
      id: 6,
      imageSrc: '/assets/Image_For_Card_6.jpg',
      imageAlt: 'Breaking Bad',
      hoverTitle: 'Breaking Bad'
    }
  ];

}