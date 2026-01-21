import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Button } from '../../components/shared/button/button';
import { CardList } from '../../components/shared/card-list/card-list';

/**
 * Interface for list data
 */
interface ListData {
  id: string;
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
  private router = inject(Router);

  /**
   * Official lists (large size)
   */
  officialLists: ListData[] = [
    {
      id: 'horror',
      title: 'Horror series',
      images: [
        { src: '/assets/Images_For_Card_1.jpg', alt: 'Twin Peaks' },
        { src: '/assets/Images_For_Card_2.jpg', alt: 'Stranger Things' },
        { src: '/assets/Image_For_Card_3.jpg', alt: 'Alien: Earth' },
        { src: '/assets/Image_For_Card_4.jpg', alt: 'The Haunting of Hill House' }
      ]
    },
    {
      id: 'thrillers',
      title: 'Thrillers / Mystery series',
      images: [
        { src: '/assets/Images_For_Card_2.jpg', alt: 'Stranger Things' },
        { src: '/assets/Image_For_Card_4.jpg', alt: 'The Haunting of Hill House' },
        { src: '/assets/Image_For_Card_5.jpg', alt: 'The Walking Dead' },
        { src: '/assets/Image_For_Card_6.jpg', alt: 'Breaking Bad' }
      ]
    },
    {
      id: 'reality',
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
   * Popular lists (small size)
   */
  popularLists: ListData[] = [
    {
      id: 'short-series',
      title: 'Less than 10 episodes long',
      images: [
        { src: '/assets/Images_For_Card_1.jpg', alt: 'Twin Peaks' },
        { src: '/assets/Image_For_Card_4.jpg', alt: 'The Haunting of Hill House' },
        { src: '/assets/Images_For_Card_9.jpg', alt: 'Black Mirror' },
        { src: '/assets/Images_For_Card_10.jpg', alt: 'The Creep Tapes' }
      ]
    },
    {
      id: 'netflix-removed',
      title: 'Removed from Netflix',
      images: [
        { src: '/assets/Images_For_Card_2.jpg', alt: 'Stranger Things' },
        { src: '/assets/Image_For_Card_6.jpg', alt: 'Breaking Bad' },
        { src: '/assets/Images_For_Card_7.png', alt: 'It: Welcome to Derry' },
        { src: '/assets/Images_For_Card_11.jpg', alt: 'Smiling Friends' }
      ]
    },
    {
      id: 'female-leads',
      title: 'Female leads',
      images: [
        { src: '/assets/Image_For_Card_4.jpg', alt: 'The Haunting of Hill House' },
        { src: '/assets/Images_For_Card_8.png', alt: 'Buffy the Vampire Slayer' },
        { src: '/assets/Images_For_Card_1.jpg', alt: 'Twin Peaks' },
        { src: '/assets/Image_For_Card_3.jpg', alt: 'Alien: Earth' }
      ]
    },
    {
      id: 'indie-animation',
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
   * Handle "See more" click - navigate to see more page
   */
  onSeeMore(section: string): void {
    this.router.navigate(['/seemore'], { queryParams: { section } });
  }
}
