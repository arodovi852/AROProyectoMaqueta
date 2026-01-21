import { Component } from '@angular/core';

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

/**
 * Features Component
 * 
 * Displays the main service features in a card grid
 */
@Component({
  selector: 'app-features',
  imports: [],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class Features {
  features: Feature[] = [
    {
      id: 1,
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
      title: 'High Performance',
      description: 'Optimized solutions that guarantee speed and efficiency in all your operations.'
    },
    {
      id: 2,
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
      title: 'Advanced Security',
      description: 'Enterprise-level data protection with encryption and regulatory compliance.'
    },
    {
      id: 3,
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
      title: '24/7 Support',
      description: 'Continuous assistance from our expert team whenever you need it.'
    },
    {
      id: 4,
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      title: 'Cloud Native',
      description: 'Scalable and flexible cloud infrastructure that grows with your business.'
    },
    {
      id: 5,
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      title: 'Real-Time Analytics',
      description: 'Interactive dashboards with metrics and reports for informed decisions.'
    },
    {
      id: 6,
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
      title: 'Collaboration',
      description: 'Integrated tools for teamwork and effective communication.'
    }
  ];
}
