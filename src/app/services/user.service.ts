import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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

const LOGGED_SERIES_KEY = 'broadcasttd_logged_series';
const RECENTLY_WATCHED_KEY = 'broadcasttd_recently_watched';
const SAVED_LISTS_KEY = 'broadcasttd_saved_lists';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [
    { id: 1, name: 'John Perez', email: 'john@example.com', active: true },
    { id: 2, name: 'Mary Garcia', email: 'mary@example.com', active: true },
    { id: 3, name: 'Carlos Lopez', email: 'carlos@example.com', active: false },
    { id: 4, name: 'Anna Martinez', email: 'anna@example.com', active: true },
  ];

  // Signals for reactive updates
  loggedSeries = signal<TrackedSeries[]>(this.loadLoggedSeries());
  recentlyWatched = signal<TrackedSeries[]>(this.loadRecentlyWatched());
  savedLists = signal<SavedList[]>(this.loadSavedLists());

  constructor() {
    // Initialize from localStorage
    this.loggedSeries.set(this.loadLoggedSeries());
    this.recentlyWatched.set(this.loadRecentlyWatched());
    this.savedLists.set(this.loadSavedLists());
  }

  // ============================================
  // LOGGED SERIES (Watch Later)
  // ============================================

  private loadLoggedSeries(): TrackedSeries[] {
    try {
      const data = localStorage.getItem(LOGGED_SERIES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveLoggedSeries(series: TrackedSeries[]): void {
    localStorage.setItem(LOGGED_SERIES_KEY, JSON.stringify(series));
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
      const data = localStorage.getItem(RECENTLY_WATCHED_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveRecentlyWatched(series: TrackedSeries[]): void {
    localStorage.setItem(RECENTLY_WATCHED_KEY, JSON.stringify(series));
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
   * When no ratings exist, returns placeholder values for visual consistency
   */
  getRatingDistribution(): number[] {
    const ratings = this.loadRecentlyWatched()
      .filter(s => s.rating !== undefined && s.rating > 0)
      .map(s => s.rating!);
    
    // If no ratings yet, return placeholder values (like a sample distribution)
    if (ratings.length === 0) {
      return [15, 25, 35, 50, 65, 80, 90, 75, 55, 40];
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
      const data = localStorage.getItem(SAVED_LISTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveSavedLists(lists: SavedList[]): void {
    localStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(lists));
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
