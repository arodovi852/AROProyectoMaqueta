import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../components/shared/card/card';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageSrc: string;
  readTime: string;
}

/**
 * News Page
 * 
 * Latest news and updates about series and the platform
 */
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, Card],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News {
  selectedCategory = signal<string>('all');

  categories = ['all', 'releases', 'updates', 'industry', 'features'];

  featuredNews: NewsArticle = {
    id: 1,
    title: 'The Last of Us Season 3 Officially Confirmed with 2026 Release Window',
    excerpt: 'HBO confirms the highly anticipated third season with returning cast members and new additions. Production is set to begin in early 2026 with a fall premiere expected.',
    date: 'January 20, 2026',
    category: 'releases',
    imageSrc: '/assets/Images_For_Card_1.jpg',
    readTime: '5 min read'
  };

  newsArticles: NewsArticle[] = [
    {
      id: 2,
      title: 'Stranger Things Final Season Wraps Filming',
      excerpt: 'After months of production, the Duffer Brothers announce the completion of the final chapter in the beloved Netflix series.',
      date: 'January 18, 2026',
      category: 'releases',
      imageSrc: '/assets/Images_For_Card_2.jpg',
      readTime: '3 min read'
    },
    {
      id: 3,
      title: 'BROADCASTTD Introduces AI-Powered Recommendations',
      excerpt: 'Our new recommendation engine uses advanced machine learning to suggest series based on your unique viewing patterns.',
      date: 'January 15, 2026',
      category: 'features',
      imageSrc: '/assets/Images_For_Card_3.jpg',
      readTime: '4 min read'
    },
    {
      id: 4,
      title: 'House of the Dragon Season 3 First Look Released',
      excerpt: 'HBO Max drops exclusive images from the upcoming season, teasing massive dragon battles and political intrigue.',
      date: 'January 12, 2026',
      category: 'releases',
      imageSrc: '/assets/Images_For_Card_4.jpg',
      readTime: '2 min read'
    },
    {
      id: 5,
      title: 'Streaming Industry Hits 500 Million Subscribers Globally',
      excerpt: 'New report shows unprecedented growth in streaming services, with BROADCASTTD users contributing to the surge in series tracking.',
      date: 'January 10, 2026',
      category: 'industry',
      imageSrc: '/assets/Images_For_Card_5.jpg',
      readTime: '6 min read'
    },
    {
      id: 6,
      title: 'New Social Features Coming to BROADCASTTD',
      excerpt: 'Share lists, follow friends, and discover what your community is watching with our upcoming social update.',
      date: 'January 8, 2026',
      category: 'updates',
      imageSrc: '/assets/Images_For_Card_6.jpg',
      readTime: '3 min read'
    },
    {
      id: 7,
      title: 'Breaking Bad Prequel Announced by AMC',
      excerpt: 'A new series exploring the early days of the Albuquerque drug scene is in development at AMC Studios.',
      date: 'January 5, 2026',
      category: 'releases',
      imageSrc: '/assets/Images_For_Card_7.jpg',
      readTime: '4 min read'
    },
    {
      id: 8,
      title: 'Platform Surpasses 10 Million Active Users',
      excerpt: 'BROADCASTTD celebrates a major milestone as our community continues to grow exponentially.',
      date: 'January 3, 2026',
      category: 'updates',
      imageSrc: '/assets/Images_For_Card_8.jpg',
      readTime: '2 min read'
    }
  ];

  get filteredNews(): NewsArticle[] {
    if (this.selectedCategory() === 'all') {
      return this.newsArticles;
    }
    return this.newsArticles.filter(article => article.category === this.selectedCategory());
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
