import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../components/shared/card/card';
import { CardStatReview } from '../../components/shared/card-stat-review/card-stat-review';
import { ResponsiveBanner } from '../../components/shared/responsive-banner/responsive-banner';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

/**
 * Interface for series in a list
 */
interface ListSeries {
  id: number;
  title: string;
  imageSrc: string;
}

/**
 * Interface for list data
 */
interface ListInfo {
  id: string;
  title: string;
  bannerImage: string;
  series: ListSeries[];
}

/**
 * ListContent Page
 * 
 * Page that displays list content with:
 * - Image banner
 * - List series (Cards)
 * - CardStatReview to save the list
 * - Dynamic content based on listId route parameter
 */
@Component({
  selector: 'app-list-content',
  imports: [CommonModule, Card, CardStatReview, ResponsiveBanner],
  templateUrl: './list-content.html',
  styleUrl: './list-content.scss',
})
export class ListContent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private toast = inject(ToastService);

  // Current list data
  listId = signal<string>('');
  listName = signal<string>('List');
  bannerImage = signal<string>('/assets/Images_For_Card_1.jpg');
  series = signal<ListSeries[]>([]);

  // Stats and state
  statsBars = [25, 40, 55, 70, 85, 95, 90, 80, 65, 50];
  listRating = signal<number>(0);
  isSaved = signal<boolean>(false);

  /**
   * All available lists with unique series for each
   */
  private readonly listsData: Record<string, ListInfo> = {
    'horror': {
      id: 'horror',
      title: 'Horror series',
      bannerImage: '/assets/Images_For_Card_1.jpg',
      series: [
        { id: 1, title: 'Twin Peaks', imageSrc: '/assets/Images_For_Card_1.jpg' },
        { id: 2, title: 'Stranger Things', imageSrc: '/assets/Images_For_Card_2.jpg' },
        { id: 3, title: 'Alien: Earth', imageSrc: '/assets/Image_For_Card_3.jpg' },
        { id: 4, title: 'The Haunting of Hill House', imageSrc: '/assets/Image_For_Card_4.jpg' },
        { id: 7, title: 'It: Welcome to Derry', imageSrc: '/assets/Images_For_Card_7.png' },
        { id: 10, title: 'The Creep Tapes', imageSrc: '/assets/Images_For_Card_10.jpg' }
      ]
    },
    'thrillers': {
      id: 'thrillers',
      title: 'Thrillers / Mystery series',
      bannerImage: '/assets/Images_For_Card_2.jpg',
      series: [
        { id: 2, title: 'Stranger Things', imageSrc: '/assets/Images_For_Card_2.jpg' },
        { id: 4, title: 'The Haunting of Hill House', imageSrc: '/assets/Image_For_Card_4.jpg' },
        { id: 5, title: 'The Walking Dead', imageSrc: '/assets/Image_For_Card_5.jpg' },
        { id: 6, title: 'Breaking Bad', imageSrc: '/assets/Image_For_Card_6.jpg' },
        { id: 9, title: 'Black Mirror', imageSrc: '/assets/Images_For_Card_9.jpg' },
        { id: 1, title: 'Twin Peaks', imageSrc: '/assets/Images_For_Card_1.jpg' }
      ]
    },
    'reality': {
      id: 'reality',
      title: 'Reality TV shows',
      bannerImage: '/assets/Image_For_Card_3.jpg',
      series: [
        { id: 3, title: 'Alien: Earth', imageSrc: '/assets/Image_For_Card_3.jpg' },
        { id: 1, title: 'Twin Peaks', imageSrc: '/assets/Images_For_Card_1.jpg' },
        { id: 5, title: 'The Walking Dead', imageSrc: '/assets/Image_For_Card_5.jpg' },
        { id: 9, title: 'Black Mirror', imageSrc: '/assets/Images_For_Card_9.jpg' },
        { id: 11, title: 'Smiling Friends', imageSrc: '/assets/Images_For_Card_11.jpg' },
        { id: 12, title: "JoJo's Bizarre Adventure", imageSrc: '/assets/Images_For_Card_12.jpg' }
      ]
    },
    'short-series': {
      id: 'short-series',
      title: 'Less than 10 episodes long',
      bannerImage: '/assets/Images_For_Card_9.jpg',
      series: [
        { id: 1, title: 'Twin Peaks', imageSrc: '/assets/Images_For_Card_1.jpg' },
        { id: 4, title: 'The Haunting of Hill House', imageSrc: '/assets/Image_For_Card_4.jpg' },
        { id: 9, title: 'Black Mirror', imageSrc: '/assets/Images_For_Card_9.jpg' },
        { id: 10, title: 'The Creep Tapes', imageSrc: '/assets/Images_For_Card_10.jpg' },
        { id: 3, title: 'Alien: Earth', imageSrc: '/assets/Image_For_Card_3.jpg' },
        { id: 7, title: 'It: Welcome to Derry', imageSrc: '/assets/Images_For_Card_7.png' }
      ]
    },
    'netflix-removed': {
      id: 'netflix-removed',
      title: 'Removed from Netflix',
      bannerImage: '/assets/Image_For_Card_6.jpg',
      series: [
        { id: 2, title: 'Stranger Things', imageSrc: '/assets/Images_For_Card_2.jpg' },
        { id: 6, title: 'Breaking Bad', imageSrc: '/assets/Image_For_Card_6.jpg' },
        { id: 7, title: 'It: Welcome to Derry', imageSrc: '/assets/Images_For_Card_7.png' },
        { id: 11, title: 'Smiling Friends', imageSrc: '/assets/Images_For_Card_11.jpg' },
        { id: 8, title: 'Buffy the Vampire Slayer', imageSrc: '/assets/Images_For_Card_8.png' },
        { id: 5, title: 'The Walking Dead', imageSrc: '/assets/Image_For_Card_5.jpg' }
      ]
    },
    'female-leads': {
      id: 'female-leads',
      title: 'Female leads',
      bannerImage: '/assets/Images_For_Card_8.png',
      series: [
        { id: 4, title: 'The Haunting of Hill House', imageSrc: '/assets/Image_For_Card_4.jpg' },
        { id: 8, title: 'Buffy the Vampire Slayer', imageSrc: '/assets/Images_For_Card_8.png' },
        { id: 1, title: 'Twin Peaks', imageSrc: '/assets/Images_For_Card_1.jpg' },
        { id: 3, title: 'Alien: Earth', imageSrc: '/assets/Image_For_Card_3.jpg' },
        { id: 2, title: 'Stranger Things', imageSrc: '/assets/Images_For_Card_2.jpg' },
        { id: 9, title: 'Black Mirror', imageSrc: '/assets/Images_For_Card_9.jpg' }
      ]
    },
    'indie-animation': {
      id: 'indie-animation',
      title: 'Indie animation series',
      bannerImage: '/assets/Images_For_Card_11.jpg',
      series: [
        { id: 11, title: 'Smiling Friends', imageSrc: '/assets/Images_For_Card_11.jpg' },
        { id: 12, title: "JoJo's Bizarre Adventure", imageSrc: '/assets/Images_For_Card_12.jpg' },
        { id: 9, title: 'Black Mirror', imageSrc: '/assets/Images_For_Card_9.jpg' },
        { id: 10, title: 'The Creep Tapes', imageSrc: '/assets/Images_For_Card_10.jpg' },
        { id: 7, title: 'It: Welcome to Derry', imageSrc: '/assets/Images_For_Card_7.png' },
        { id: 8, title: 'Buffy the Vampire Slayer', imageSrc: '/assets/Images_For_Card_8.png' }
      ]
    }
  };

  ngOnInit(): void {
    // Get listId from route params
    this.route.paramMap.subscribe(params => {
      const id = params.get('listId') || '';
      this.loadListData(id);
    });
  }

  /**
   * Load list data based on listId
   */
  private loadListData(listId: string): void {
    this.listId.set(listId);
    
    const listData = this.listsData[listId];
    if (listData) {
      this.listName.set(listData.title);
      this.bannerImage.set(listData.bannerImage);
      this.series.set(listData.series);
    } else {
      // Default fallback
      this.listName.set('Unknown List');
      this.bannerImage.set('/assets/Images_For_Card_1.jpg');
      this.series.set([]);
    }

    // Check if list is already saved
    this.isSaved.set(this.userService.isListSaved(listId));
  }

  onRatingChange(rating: number): void {
    this.listRating.set(rating);
  }

  onSaveListToggle(isSaved: boolean): void {
    this.isSaved.set(isSaved);
    
    if (isSaved) {
      // Get first 4 series images for the CardList display
      const seriesImages = this.series().slice(0, 4).map(s => ({
        src: s.imageSrc,
        alt: s.title
      }));
      
      // Save list to profile with series images
      this.userService.saveList({
        id: this.listId(),
        title: this.listName(),
        bannerImage: this.bannerImage(),
        seriesCount: this.series().length,
        images: seriesImages,
        addedAt: new Date()
      });
      this.toast.success(`"${this.listName()}" added to your saved lists`);
    } else {
      // Remove from saved lists
      this.userService.removeList(this.listId());
      this.toast.info(`"${this.listName()}" removed from your saved lists`);
    }
  }
}
