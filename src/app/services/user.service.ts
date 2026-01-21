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

const LOGGED_SERIES_KEY = 'broadcasttd_logged_series';
const RECENTLY_WATCHED_KEY = 'broadcasttd_recently_watched';

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

  constructor() {
    // Initialize from localStorage
    this.loggedSeries.set(this.loadLoggedSeries());
    this.recentlyWatched.set(this.loadRecentlyWatched());
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
    
    // Keep only the last 6
    if (current.length > 6) {
      current = current.slice(0, 6);
    }
    
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
