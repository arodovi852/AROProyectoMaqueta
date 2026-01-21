import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbService, Breadcrumb } from '../../../services/breadcrumb.service';

/**
 * Breadcrumbs Component (PHASE 4 - Task 6)
 * 
 * Displays breadcrumb navigation based on the current route.
 * Updates automatically with each navigation.
 */
@Component({
  selector: 'app-breadcrumbs',
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
})
export class Breadcrumbs implements OnInit {
  private breadcrumbService = inject(BreadcrumbService);
  
  breadcrumbs = signal<Breadcrumb[]>([]);

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs.set(breadcrumbs);
    });
  }
}

