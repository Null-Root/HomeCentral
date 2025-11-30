import { Injectable, signal } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class SessionService {

  // Global state
  uid = signal<string | null>(null);
  email = signal<string | null>(null);
  name = signal<string | null>(null);
  activeTrackingId = signal<string | null>(null);

  constructor() {}

  // ------------------------------
  // USER STATE MANAGEMENT
  // ------------------------------

  setUser(uid: string, email: string, name: string) {
    this.uid.set(uid);
    this.email.set(email);
    this.name.set(name);
  }

  setActiveTracking(id: string) {
    this.activeTrackingId.set(id);
  }

  clearUser() {
    this.uid.set(null);
    this.email.set(null);
    this.name.set(null);
    this.activeTrackingId.set(null);
  }

  clearActiveTracking() {
    this.activeTrackingId.set(null);
  }
}
