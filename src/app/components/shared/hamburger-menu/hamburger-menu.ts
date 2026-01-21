import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Hamburger Menu Component
 * Implements toggle with close on click outside
 */
@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.html',
  styleUrl: './hamburger-menu.scss',
  standalone: true,
  imports: [CommonModule]
})
export class HamburgerMenu {
  isOpen = false;

  constructor(private elementRef: ElementRef) {}

  // Menu toggle
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  // Close menu
  closeMenu() {
    this.isOpen = false;
  }

  // Listener for document clicks
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // If the menu is open and the click was outside the component, close it
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  // Prevent closing when clicking inside the menu
  onMenuClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
