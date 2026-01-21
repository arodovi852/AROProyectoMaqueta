import { Component, inject, OnInit, OnDestroy, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Card } from '../../components/shared/card/card';
import { Button } from '../../components/shared/button/button';
import { SeriesService, Series } from '../../services/series.service';
import { ToastService } from '../../services/toast.service';

/**
 * Interface for series card data
 */
interface SeriesCard {
  id: number;
  imageSrc: string;
  imageAlt: string;
  hoverTitle: string;
}

/**
 * Interface for carousel slide
 */
interface CarouselSlide {
  id: number;
  imageSrc: string;
  imageAlt: string;
  title: string;
}

/**
 * Main Page (PHASE 4 - Task 2, PHASE 5 - Task 5)
 * 
 * Main application page with hero carousel and series grid.
 * Similar to series tracking platforms like Trakt or Letterboxd.
 * 
 * Implements:
 * - Rotating image carousel in hero section
 * - Programmatic navigation with Router
 * - Loading and error states
 * - Integration with SeriesService
 */
@Component({
  selector: 'app-main',
  imports: [CommonModule, Card, Button],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Main implements OnInit, OnDestroy {
  private router = inject(Router);
  private seriesService = inject(SeriesService);
  private toast = inject(ToastService);
  
  // Carousel state
  private carouselInterval: ReturnType<typeof setInterval> | null = null;
  currentSlide = signal<number>(0);
  isCarouselPaused = signal<boolean>(false);

  /**
   * Carousel slides - rotating series images
   */
  carouselSlides: CarouselSlide[] = [
    {
      id: 1,
      imageSrc: '/assets/Images_For_Card_1.jpg',
      imageAlt: 'Twin Peaks',
      title: 'Twin Peaks'
    },
    {
      id: 2,
      imageSrc: '/assets/Images_For_Card_2.jpg',
      imageAlt: 'Stranger Things',
      title: 'Stranger Things'
    },
    {
      id: 3,
      imageSrc: '/assets/Image_For_Card_3.jpg',
      imageAlt: 'Alien: Earth',
      title: 'Alien: Earth'
    },
    {
      id: 7,
      imageSrc: '/assets/Images_For_Card_7.png',
      imageAlt: 'It: Welcome to Derry',
      title: 'It: Welcome to Derry'
    },
    {
      id: 9,
      imageSrc: '/assets/Images_For_Card_9.jpg',
      imageAlt: 'Black Mirror',
      title: 'Black Mirror'
    },
    {
      id: 10,
      imageSrc: '/assets/Images_For_Card_10.jpg',
      imageAlt: 'The Creep Tapes',
      title: 'The Creep Tapes'
    }
  ];

  // States
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  seriesFromApi = signal<Series[]>([]);
  /**
   * Popular series of the week
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
   * Upcoming releases
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

  ngOnInit(): void {
    this.loadSeriesFromApi();
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  /**
   * Start the carousel auto-rotation
   */
  startCarousel(): void {
    this.carouselInterval = setInterval(() => {
      if (!this.isCarouselPaused()) {
        this.nextSlide();
      }
    }, 5000); // Rotate every 5 seconds
  }

  /**
   * Stop the carousel auto-rotation
   */
  stopCarousel(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.carouselInterval = null;
    }
  }

  /**
   * Go to next slide
   */
  nextSlide(): void {
    const current = this.currentSlide();
    const next = (current + 1) % this.carouselSlides.length;
    this.currentSlide.set(next);
  }

  /**
   * Go to previous slide
   */
  previousSlide(): void {
    const current = this.currentSlide();
    const prev = current === 0 ? this.carouselSlides.length - 1 : current - 1;
    this.currentSlide.set(prev);
  }

  /**
   * Go to specific slide
   */
  goToSlide(index: number): void {
    this.currentSlide.set(index);
  }

  /**
   * Pause carousel on hover
   */
  onCarouselMouseEnter(): void {
    this.isCarouselPaused.set(true);
  }

  /**
   * Resume carousel on mouse leave
   */
  onCarouselMouseLeave(): void {
    this.isCarouselPaused.set(false);
  }

  /**
   * Load series from service (PHASE 5 - Task 5)
   */
  loadSeriesFromApi(): void {
    this.loading.set(true);
    this.error.set(null);

    this.seriesService.getAllSeries().subscribe({
      next: (series) => {
        this.seriesFromApi.set(series);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Error loading series');
        this.toast.error('Could not load series');
      }
    });
  }

  /**
   * Programmatic navigation to series detail (PHASE 4 - Task 2)
   */
  navigateToSeries(id: number): void {
    this.router.navigate(['/series', id]);
  }

  /**
   * Programmatic navigation with query params (PHASE 4 - Task 2)
   */
  searchSeries(query: string): void {
    this.router.navigate(['/searchresult'], {
      queryParams: { q: query }
    });
  }

  /**
   * Get started click handler (PHASE 4 - Task 2)
   */
  onGetStarted(): void {
    // Programmatic navigation to profile/registration
    this.router.navigate(['/profile']);
  }

  /**
   * See more click handler (PHASE 4 - Task 2)
   */
  onSeeMore(section: string): void {
    this.router.navigate(['/seemore'], {
      queryParams: { section }
    });
  }
}
