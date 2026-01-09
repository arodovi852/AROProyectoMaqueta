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

  /**
   * Próximos estrenos
   */
  futureReleases: SeriesCard[] = [
    {
      id: 7,
      imageSrc: '/assets/Images_For_Card_7.png',
      imageAlt: 'It: Welcome to Derry',
      hoverTitle: 'It: Welcome to Derry'
    },
    {
      id: 8,
      imageSrc: '/assets/Images_For_Card_8.png',
      imageAlt: 'Buffy the Vampire Slayer',
      hoverTitle: 'Buffy the Vampire Slayer'
    },
    {
      id: 9,
      imageSrc: '/assets/Images_For_Card_9.jpg',
      imageAlt: 'Black Mirror',
      hoverTitle: 'Black Mirror'
    },
    {
      id: 10,
      imageSrc: '/assets/Images_For_Card_10.jpg',
      imageAlt: 'The Creep Tapes',
      hoverTitle: 'The Creep Tapes'
    },
    {
      id: 11,
      imageSrc: '/assets/Images_For_Card_11.jpg',
      imageAlt: 'Smiling Friends',
      hoverTitle: 'Smiling Friends'
    },
    {
      id: 12,
      imageSrc: '/assets/Images_For_Card_12.jpg',
      imageAlt: "JoJo's Bizarre Adventure",
      hoverTitle: "JoJo's Bizarre Adventure"
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
