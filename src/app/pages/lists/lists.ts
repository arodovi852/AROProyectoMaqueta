import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Button } from '../../components/shared/button/button';
import { CardList } from '../../components/shared/card-list/card-list';

/**
 * Interface for list data
 */
interface ListData {
  title: string;
  images: { src: string; alt: string }[];
}

/**
 * Lists Page
 * 
 * Page that displays official and popular series lists.
 */
@Component({
  selector: 'app-lists',
  imports: [CommonModule, RouterLink, Button, CardList],
  templateUrl: './lists.html',
  styleUrl: './lists.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lists {
  /**
   * Official lists (large size)
   */
  officialLists: ListData[] = [
    {
      title: 'Horror series',
      images: [
        { src: '/assets/Images_For_Card_1.jpg', alt: 'Twin Peaks' },
        { src: '/assets/Images_For_Card_2.jpg', alt: 'Stranger Things' },
        { src: '/assets/Image_For_Card_3.jpg', alt: 'Alien: Earth' },
        { src: '/assets/Image_For_Card_4.jpg', alt: 'The Haunting of Hill House' }
      ]
    },
    {
      title: 'Thrillers / Mystery series',
      images: [
        { src: '/assets/Images_For_Card_2.jpg', alt: 'Stranger Things' },
        { src: '/assets/Image_For_Card_4.jpg', alt: 'The Haunting of Hill House' },
        { src: '/assets/Image_For_Card_5.jpg', alt: 'The Walking Dead' },
        { src: '/assets/Image_For_Card_6.jpg', alt: 'Breaking Bad' }
      ]
    },
    {
      title: 'Reality TV shows',
      images: [
        { src: '/assets/Image_For_Card_3.jpg', alt: 'Alien: Earth' },
        { src: '/assets/Images_For_Card_1.jpg', alt: 'Twin Peaks' },
        { src: '/assets/Image_For_Card_5.jpg', alt: 'The Walking Dead' },
        { src: '/assets/Images_For_Card_9.jpg', alt: 'Black Mirror' }
      ]
    }
  ];

  /**
   * Listas populares (tamaño pequeño)
   */
  popularLists: ListData[] = [
    {
      title: 'Less than 10 episodes long',
      images: [
        { src: '/assets/Images_For_Card_1.jpg', alt: 'Twin Peaks' },
        { src: '/assets/Image_For_Card_4.jpg', alt: 'The Haunting of Hill House' },
        { src: '/assets/Images_For_Card_9.jpg', alt: 'Black Mirror' },
        { src: '/assets/Images_For_Card_10.jpg', alt: 'The Creep Tapes' }
      ]
    },
    {
      title: 'Removed from Netflix',
      images: [
        { src: '/assets/Images_For_Card_2.jpg', alt: 'Stranger Things' },
        { src: '/assets/Image_For_Card_6.jpg', alt: 'Breaking Bad' },
        { src: '/assets/Images_For_Card_7.png', alt: 'It: Welcome to Derry' },
        { src: '/assets/Images_For_Card_11.jpg', alt: 'Smiling Friends' }
      ]
    },
    {
      title: 'Female leads',
      images: [
        { src: '/assets/Image_For_Card_4.jpg', alt: 'The Haunting of Hill House' },
        { src: '/assets/Images_For_Card_8.png', alt: 'Buffy the Vampire Slayer' },
        { src: '/assets/Images_For_Card_1.jpg', alt: 'Twin Peaks' },
        { src: '/assets/Image_For_Card_3.jpg', alt: 'Alien: Earth' }
      ]
    },
    {
      title: 'Indie animation series',
      images: [
        { src: '/assets/Images_For_Card_11.jpg', alt: 'Smiling Friends' },
        { src: '/assets/Images_For_Card_12.jpg', alt: "JoJo's Bizarre Adventure" },
        { src: '/assets/Images_For_Card_9.jpg', alt: 'Black Mirror' },
        { src: '/assets/Images_For_Card_10.jpg', alt: 'The Creep Tapes' }
      ]
    }
  ];

  /**
   * Manejador del click en "See more"
   */
  onSeeMore(section: string): void {
    console.log('See more clicked for:', section);
  }
}
