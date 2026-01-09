import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../components/shared/card/card';
import { Button } from '../../components/shared/button/button';

/**
 * Interface para los datos de las tarjetas de series
 */
interface SeriesCard {
  id: number;
  imageSrc: string;
  imageAlt: string;
  hoverTitle: string;
}

/**
 * Página Main
 * 
 * Página principal de la aplicación con hero section y grid de series.
 * Similar a plataformas de seguimiento de series como Trakt o Letterboxd.
 */
@Component({
  selector: 'app-main',
  imports: [CommonModule, Card, Button],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  /**
   * Series populares de la semana
   */
  popularSeries: SeriesCard[] = [
    {
      id: 1,
      imageSrc: '/assets/Images_For_Card_1.jpg',
      imageAlt: 'Serie 1',
      hoverTitle: 'Stranger Things'
    },
    {
      id: 2,
      imageSrc: '/assets/Images_For_Card_2.jpg',
      imageAlt: 'Serie 2',
      hoverTitle: 'Twin Peaks'
    },
    {
      id: 3,
      imageSrc: '/assets/Image_For_Card_3.jpg',
      imageAlt: 'Serie 3',
      hoverTitle: 'Breaking Bad'
    },
    {
      id: 4,
      imageSrc: '/assets/Image_For_Card_4.jpg',
      imageAlt: 'Serie 4',
      hoverTitle: 'The Haunting of Hill House'
    },
    {
      id: 5,
      imageSrc: '/assets/Image_For_Card_5.jpg',
      imageAlt: 'Serie 5',
      hoverTitle: 'The Walking Dead'
    },
    {
      id: 6,
      imageSrc: '/assets/Image_For_Card_6.jpg',
      imageAlt: 'Serie 6',
      hoverTitle: 'Alien Earth'
    }
  ];

  /**
   * Próximos estrenos
   */
  futureReleases: SeriesCard[] = [
    {
      id: 7,
      imageSrc: '/assets/Images_For_Card_7.png',
      imageAlt: 'Serie 7',
      hoverTitle: 'Stranger Things S5'
    },
    {
      id: 8,
      imageSrc: '/assets/Images_For_Card_8.png',
      imageAlt: 'Serie 8',
      hoverTitle: 'Twin Peaks: The Return'
    },
    {
      id: 9,
      imageSrc: '/assets/Images_For_Card_9.jpg',
      imageAlt: 'Serie 9',
      hoverTitle: 'Breaking Bad Movie'
    },
    {
      id: 10,
      imageSrc: '/assets/Images_For_Card_10.jpg',
      imageAlt: 'Serie 10',
      hoverTitle: 'Hill House S2'
    },
    {
      id: 11,
      imageSrc: '/assets/Images_For_Card_11.jpg',
      imageAlt: 'Serie 11',
      hoverTitle: 'Walking Dead: Origins'
    },
    {
      id: 12,
      imageSrc: '/assets/Images_For_Card_12.jpg',
      imageAlt: 'Serie 12',
      hoverTitle: 'Alien Earth: Prologue'
    }
  ];

  /**
   * Manejador del click en "Get started"
   */
  onGetStarted(): void {
    console.log('Get started clicked');
    // TODO: Implementar navegación o modal de registro
  }

  /**
   * Manejador del click en "See more"
   */
  onSeeMore(section: string): void {
    console.log('See more clicked for:', section);
    // TODO: Implementar navegación a la sección completa
  }
}
