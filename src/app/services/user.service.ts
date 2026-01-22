import { Injectable, signal, inject } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

export interface TrackedSeries {
  id: number;
  title: string;
  imageSrc: string;
  hoverTitle: string;
  rating?: number;
  addedAt: Date;
}

export interface SavedList {
  id: string;
  title: string;
  bannerImage: string;
  seriesCount: number;
  images: { src: string; alt: string }[];
  addedAt: Date;
}

/**
 * UserService - Manages user-specific data
 * 
 * All data (logged series, recently watched, saved lists) is stored
 * per-user using the username as a key prefix in localStorage.
 * This ensures each user has their own isolated data.
 */
@Injectable({ providedIn: 'root' })
export class UserService {
  private authService = inject(AuthService);
  
  private users: User[] = [
    { id: 1, name: 'John Perez', email: 'john@example.com', active: true },
    { id: 2, name: 'Mary Garcia', email: 'mary@example.com', active: true },
    { id: 3, name: 'Carlos Lopez', email: 'carlos@example.com', active: false },
    { id: 4, name: 'Anna Martinez', email: 'anna@example.com', active: true },
  ];

  // Signals for reactive updates
  loggedSeries = signal<TrackedSeries[]>([]);
  recentlyWatched = signal<TrackedSeries[]>([]);
  savedLists = signal<SavedList[]>([]);

  constructor() {
    // Register callback with AuthService
    this.authService.registerAuthChangeCallback(() => this.refreshUserData());
    
    // Initialize from localStorage for current user
    this.refreshUserData();
  }

  /**
   * Get the current username from localStorage
   * Returns null if no user is logged in
   */
  private getCurrentUsername(): string | null {
    try {
      const currentUser = localStorage.getItem('current_user');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        return user.username || null;
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Generate storage key with user prefix
   */
  private getUserKey(baseKey: string): string {
    const username = this.getCurrentUsername();
    if (!username) {
      // Return a temporary key that won't persist data properly
      // This shouldn't happen as routes are protected
      return `guest_${baseKey}`;
    }
    return `broadcasttd_${username}_${baseKey}`;
  }

  /**
   * Refresh all user data from localStorage
   * Call this when user logs in or out
   */
  refreshUserData(): void {
    this.loggedSeries.set(this.loadLoggedSeries());
    this.recentlyWatched.set(this.loadRecentlyWatched());
    this.savedLists.set(this.loadSavedLists());
  }

  /**
   * Clear all signals when user logs out
   */
  clearUserData(): void {
    this.loggedSeries.set([]);
    this.recentlyWatched.set([]);
    this.savedLists.set([]);
  }

  // ============================================
  // LOGGED SERIES (Watch Later)
  // ============================================

  private loadLoggedSeries(): TrackedSeries[] {
    try {
      const key = this.getUserKey('logged_series');
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveLoggedSeries(series: TrackedSeries[]): void {
    const key = this.getUserKey('logged_series');
    localStorage.setItem(key, JSON.stringify(series));
    this.loggedSeries.set(series);
  }

  addToLoggedSeries(series: TrackedSeries): boolean {
    const current = this.loadLoggedSeries();
    const exists = current.some(s => s.id === series.id);
    
    if (!exists) {
      const newSeries = { ...series, addedAt: new Date() };
      const updated = [newSeries, ...current];
      this.saveLoggedSeries(updated);
      return true;
    }
    return false;
  }

  removeFromLoggedSeries(seriesId: number): boolean {
    const current = this.loadLoggedSeries();
    const filtered = current.filter(s => s.id !== seriesId);
    
    if (filtered.length !== current.length) {
      this.saveLoggedSeries(filtered);
      return true;
    }
    return false;
  }

  isInLoggedSeries(seriesId: number): boolean {
    return this.loadLoggedSeries().some(s => s.id === seriesId);
  }

  getLoggedSeries(): TrackedSeries[] {
    return this.loadLoggedSeries();
  }

  // ============================================
  // RECENTLY WATCHED (Rated Series)
  // ============================================

  private loadRecentlyWatched(): TrackedSeries[] {
    try {
      const key = this.getUserKey('recently_watched');
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveRecentlyWatched(series: TrackedSeries[]): void {
    const key = this.getUserKey('recently_watched');
    localStorage.setItem(key, JSON.stringify(series));
    this.recentlyWatched.set(series);
  }

  addToRecentlyWatched(series: TrackedSeries): void {
    let current = this.loadRecentlyWatched();
    
    // Remove if already exists (to update position)
    current = current.filter(s => s.id !== series.id);
    
    // Add to beginning with timestamp
    const newSeries = { ...series, addedAt: new Date() };
    current = [newSeries, ...current];
    
    // No limit - store all watched series
    this.saveRecentlyWatched(current);
  }

  updateSeriesRating(seriesId: number, rating: number): void {
    const current = this.loadRecentlyWatched();
    const index = current.findIndex(s => s.id === seriesId);
    
    if (index !== -1) {
      current[index].rating = rating;
      this.saveRecentlyWatched(current);
    }
  }

  getRecentlyWatched(): TrackedSeries[] {
    return this.loadRecentlyWatched();
  }

  getSeriesRating(seriesId: number): number | undefined {
    const series = this.loadRecentlyWatched().find(s => s.id === seriesId);
    return series?.rating;
  }

  /**
   * Get rating distribution for stats display
   * Returns an array of 10 percentages for ratings: 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5
   * Each value is the percentage (0-100) based on count relative to max count
   * When no ratings exist, returns array of zeros (no bars shown)
   */
  getRatingDistribution(): number[] {
    const ratings = this.loadRecentlyWatched()
      .filter(s => s.rating !== undefined && s.rating > 0)
      .map(s => s.rating!);
    
    // If no ratings yet, return zeros (no bars will be shown)
    if (ratings.length === 0) {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    
    // Count ratings at each half-star level
    const distribution: number[] = [];
    const ratingLevels = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    
    for (const level of ratingLevels) {
      const count = ratings.filter(r => r === level).length;
      distribution.push(count);
    }
    
    // Convert counts to percentages (relative to max count)
    const maxCount = Math.max(...distribution, 1); // Avoid division by zero
    return distribution.map(count => Math.round((count / maxCount) * 100));
  }

  // ============================================
  // SAVED LISTS
  // ============================================

  private loadSavedLists(): SavedList[] {
    try {
      const key = this.getUserKey('saved_lists');
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveSavedLists(lists: SavedList[]): void {
    const key = this.getUserKey('saved_lists');
    localStorage.setItem(key, JSON.stringify(lists));
    this.savedLists.set(lists);
  }

  saveList(list: SavedList): boolean {
    const current = this.loadSavedLists();
    const exists = current.some(l => l.id === list.id);
    
    if (!exists) {
      const newList = { ...list, addedAt: new Date() };
      const updated = [newList, ...current];
      this.saveSavedLists(updated);
      return true;
    }
    return false;
  }

  removeList(listId: string): boolean {
    const current = this.loadSavedLists();
    const filtered = current.filter(l => l.id !== listId);
    
    if (filtered.length !== current.length) {
      this.saveSavedLists(filtered);
      return true;
    }
    return false;
  }

  isListSaved(listId: string): boolean {
    return this.loadSavedLists().some(l => l.id === listId);
  }

  getSavedLists(): SavedList[] {
    return this.loadSavedLists();
  }

  // ============================================
  // USER METHODS
  // ============================================

  getUsers(): Observable<User[]> {
    return of(this.users).pipe(
      delay(1500),
      map(users => users.filter(u => u.active)),
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(this.users.find(u => u.id === id)).pipe(
      delay(800),
      catchError(this.handleError)
    );
  }

  saveUser(user: User): Observable<User> {
    return of(user).pipe(
      delay(2000),
      map(u => {
        const index = this.users.findIndex(existing => existing.id === u.id);
        if (index >= 0) {
          this.users[index] = u;
        } else {
          this.users.push({ ...u, id: this.users.length + 1 });
        }
        return u;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: any): Observable<never> {
    return throwError(() => new Error('Error loading users'));
  }
}
