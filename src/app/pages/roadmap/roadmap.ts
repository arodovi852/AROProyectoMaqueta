import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned' | 'exploring';
  quarter: string;
  category: string;
  votes?: number;
}

/**
 * Roadmap Page
 * 
 * Future plans and upcoming features for the platform
 */
@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './roadmap.html',
  styleUrl: './roadmap.scss',
})
export class Roadmap {
  selectedFilter = signal<string>('all');

  filters = ['all', 'completed', 'in-progress', 'planned', 'exploring'];

  roadmapItems: RoadmapItem[] = [
    // Completed
    {
      id: '1',
      title: 'User Profiles & Authentication',
      description: 'Secure user accounts with personalized profiles, watch history, and preferences.',
      status: 'completed',
      quarter: 'Q4 2025',
      category: 'Core Features',
      votes: 892
    },
    {
      id: '2',
      title: 'Series Rating System',
      description: 'Rate series with half-star precision and contribute to community scores.',
      status: 'completed',
      quarter: 'Q4 2025',
      category: 'Core Features',
      votes: 756
    },
    {
      id: '3',
      title: 'Custom Lists',
      description: 'Create and share custom lists to organize your favorite series.',
      status: 'completed',
      quarter: 'Q4 2025',
      category: 'Organization',
      votes: 634
    },
    // In Progress
    {
      id: '4',
      title: 'Social Features',
      description: 'Follow friends, see what they\'re watching, and share recommendations.',
      status: 'in-progress',
      quarter: 'Q1 2026',
      category: 'Social',
      votes: 1243
    },
    {
      id: '5',
      title: 'Mobile Applications',
      description: 'Native iOS and Android apps with offline access and push notifications.',
      status: 'in-progress',
      quarter: 'Q1 2026',
      category: 'Platform',
      votes: 2156
    },
    {
      id: '6',
      title: 'Advanced Search & Filters',
      description: 'Filter by genre, year, rating, streaming platform, and more.',
      status: 'in-progress',
      quarter: 'Q1 2026',
      category: 'Discovery',
      votes: 987
    },
    // Planned
    {
      id: '7',
      title: 'AI-Powered Recommendations',
      description: 'Get personalized suggestions based on your viewing patterns and preferences.',
      status: 'planned',
      quarter: 'Q2 2026',
      category: 'Discovery',
      votes: 1567
    },
    {
      id: '8',
      title: 'Streaming Service Integration',
      description: 'Connect your streaming accounts to automatically track what you watch.',
      status: 'planned',
      quarter: 'Q2 2026',
      category: 'Integration',
      votes: 1834
    },
    {
      id: '9',
      title: 'Watch Party Feature',
      description: 'Sync playback with friends and chat while watching together remotely.',
      status: 'planned',
      quarter: 'Q2 2026',
      category: 'Social',
      votes: 1123
    },
    {
      id: '10',
      title: 'Episode Calendar',
      description: 'Track upcoming episodes and get reminders for your favorite shows.',
      status: 'planned',
      quarter: 'Q3 2026',
      category: 'Organization',
      votes: 945
    },
    {
      id: '11',
      title: 'Achievement System',
      description: 'Earn badges and achievements for your watching milestones.',
      status: 'planned',
      quarter: 'Q3 2026',
      category: 'Gamification',
      votes: 678
    },
    // Exploring
    {
      id: '12',
      title: 'Browser Extension',
      description: 'Quick access to your lists and tracking directly from streaming sites.',
      status: 'exploring',
      quarter: 'TBD',
      category: 'Platform',
      votes: 534
    },
    {
      id: '13',
      title: 'Community Forums',
      description: 'Discuss series with other fans in dedicated community spaces.',
      status: 'exploring',
      quarter: 'TBD',
      category: 'Social',
      votes: 412
    },
    {
      id: '14',
      title: 'Spoiler Protection Mode',
      description: 'Automatically hide spoilers for series you haven\'t finished.',
      status: 'exploring',
      quarter: 'TBD',
      category: 'Core Features',
      votes: 789
    },
    {
      id: '15',
      title: 'Multi-Language Support',
      description: 'Interface translation and localized content for global users.',
      status: 'exploring',
      quarter: 'TBD',
      category: 'Accessibility',
      votes: 623
    }
  ];

  get filteredItems(): RoadmapItem[] {
    if (this.selectedFilter() === 'all') {
      return this.roadmapItems;
    }
    return this.roadmapItems.filter(item => item.status === this.selectedFilter());
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'completed': 'Completed',
      'in-progress': 'In Progress',
      'planned': 'Planned',
      'exploring': 'Exploring'
    };
    return labels[status] || status;
  }

  getStatusIcon(status: string): string {
    const icons: Record<string, string> = {
      'completed': '✓',
      'in-progress': '⚡',
      'planned': '📅',
      'exploring': '💡'
    };
    return icons[status] || '•';
  }

  setFilter(filter: string): void {
    this.selectedFilter.set(filter);
  }
}
