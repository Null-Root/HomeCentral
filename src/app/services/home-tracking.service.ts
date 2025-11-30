import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HomeTracking } from '../models/home-tracking.model';

@Injectable({
  providedIn: 'root',
})
export class HomeTrackingService {
  private trackings: HomeTracking[] = [
    new HomeTracking('Water Intake', 'user1', [{ email: 'user1@example.com', role: 'admin' }], '1', new Date()),
    new HomeTracking('Exercise', 'user1', [{ email: 'user1@example.com', role: 'admin' }], '2', new Date()),
  ];

  constructor() {}

  getAll(): Observable<HomeTracking[]> {
    return of([...this.trackings]);
  }

  create(tracking: HomeTracking): Observable<HomeTracking> {
    // Optionally set defaults if not provided
    tracking.id = tracking.id || Math.random().toString(36).substring(2, 9);
    tracking.dateCreated = tracking.dateCreated || new Date();
    tracking.allowedUsers = tracking.allowedUsers || [];

    this.trackings.push(tracking);
    return of(tracking);
  }

  update(tracking: HomeTracking): Observable<HomeTracking> {
    const index = this.trackings.findIndex(t => t.id === tracking.id);
    if (index === -1) throw new Error('Tracking not found');

    // Replace with updated object
    this.trackings[index] = tracking;
    return of(tracking);
  }

  delete(id: string): Observable<void> {
    this.trackings = this.trackings.filter(t => t.id !== id);
    return of();
  }
}
