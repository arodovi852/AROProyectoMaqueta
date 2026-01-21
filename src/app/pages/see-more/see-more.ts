import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from '../../components/shared/card/card';

/**
 * Interface for series card data
 */
interface SeriesCard {
  id: number;
  title: string;
  imageSrc: string;
}

/**
 * See More Page
 * 
 * Displays a large grid of series cards.
 * Accessed when clicking "See more" from any section.
 */
@Component({
  selector: 'app-see-more',
  imports: [CommonModule, Card],
  templateUrl: './see-more.html',
  styleUrl: './see-more.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeeMore implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Page state
  pageTitle = signal<string>('All Series');
  section = signal<string>('');
  series = signal<SeriesCard[]>([]);

  /**
   * All available series
   */
  private readonly allSeries: SeriesCard[] = [
    { id: 1, title: 'Twin Peaks', imageSrc: '/assets/Images_For_Card_1.jpg' },
    { id: 2, title: 'Stranger Things', imageSrc: '/assets/Images_For_Card_2.jpg' },
    { id: 3, title: 'Alien: Earth', imageSrc: '/assets/Image_For_Card_3.jpg' },
    { id: 4, title: 'The Haunting of Hill House', imageSrc: '/assets/Image_For_Card_4.jpg' },
    { id: 5, title: 'The Walking Dead', imageSrc: '/assets/Image_For_Card_5.jpg' },
    { id: 6, title: 'Breaking Bad', imageSrc: '/assets/Image_For_Card_6.jpg' },
    { id: 7, title: 'It: Welcome to Derry', imageSrc: '/assets/Images_For_Card_7.png' },
    { id: 8, title: 'Buffy the Vampire Slayer', imageSrc: '/assets/Images_For_Card_8.png' },
    { id: 9, title: 'Black Mirror', imageSrc: '/assets/Images_For_Card_9.jpg' },
    { id: 10, title: 'The Creep Tapes', imageSrc: '/assets/Images_For_Card_10.jpg' },
    { id: 11, title: 'Smiling Friends', imageSrc: '/assets/Images_For_Card_11.jpg' },
    { id: 12, title: "JoJo's Bizarre Adventure", imageSrc: '/assets/Images_For_Card_12.jpg' },
  ];

  /**
   * Section-specific series collections
   */
  private readonly sectionSeries: Record<string, { title: string; ids: number[] }> = {
    'popular': {
      title: 'Popular This Week',
      ids: [1, 2, 3, 4, 5, 6]
    },
    'future': {
      title: 'Future Releases',
      ids: [7, 8, 9, 10, 11, 12]
    },
    'official': {
      title: 'Official Lists - All Series',
      ids: [1, 2, 3, 4, 5, 6, 7, 9, 10]
    },
    'horror': {
      title: 'Horror Series',
      ids: [1, 2, 3, 4, 7, 10]
    },
    'thrillers': {
      title: 'Thrillers / Mystery Series',
      ids: [1, 2, 4, 5, 6, 9]
    },
    'trending': {
      title: 'Trending Now',
      ids: [2, 4, 6, 9, 11, 12]
    },
    'new': {
      title: 'New Arrivals',
      ids: [3, 7, 10, 11, 12, 8]
    }
  };

  ngOnInit(): void {
    // Get section from query params
    this.route.queryParamMap.subscribe(params => {
      const sectionParam = params.get('section') || '';
      this.section.set(sectionParam);
      this.loadSeriesForSection(sectionParam);
    });
  }

  /**
   * Load series based on section
   */
  private loadSeriesForSection(section: string): void {
    const sectionConfig = this.sectionSeries[section];
    
    if (sectionConfig) {
      this.pageTitle.set(sectionConfig.title);
      const filteredSeries = this.allSeries.filter(s => sectionConfig.ids.includes(s.id));
      this.series.set(filteredSeries);
    } else {
      // Show all series if no specific section
      this.pageTitle.set('All Series');
      this.series.set(this.allSeries);
    }
  }

  /**
   * Navigate back to previous page
   */
  goBack(): void {
    this.router.navigate(['/']);
  }
}
