import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Interactive Tabs Component
 * Tab system with click activation
 */
@Component({
  selector: 'app-interactive-tabs',
  templateUrl: './interactive-tabs.html',
  styleUrl: './interactive-tabs.scss',
  standalone: true,
  imports: [CommonModule]
})
export class InteractiveTabs {
  activeTab: string = 'detalles';

  // Change active tab
  selectTab(tabName: string) {
    this.activeTab = tabName;
  }

  // Check if a tab is active
  isActive(tabName: string): boolean {
    return this.activeTab === tabName;
  }
}
