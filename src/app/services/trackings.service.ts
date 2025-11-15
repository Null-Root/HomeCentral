import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { HomeTracking } from '../models/home-tracking.model';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { serverTimestamp } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class TrackingsService {
  private readonly firestore = inject(Firestore);
  private readonly auth = inject(Auth);

  list(): Observable<HomeTracking[]> {
    const ref = collection(this.firestore, 'trackings');
    return collectionData(ref, { idField: 'id' }) as Observable<HomeTracking[]>;
  }

  add(tracking: Partial<HomeTracking>) {
    const ref = collection(this.firestore, 'trackings');
    const user = this.auth.currentUser;
    const createdBy = user?.uid ?? user?.email ?? 'unknown';
    return addDoc(ref, { name: tracking.name, createdBy, dateCreated: serverTimestamp() });
  }

  update(id: string, partial: Partial<HomeTracking>) {
    const ref = doc(this.firestore, `trackings/${id}`);
    return updateDoc(ref, partial);
  }

  delete(id: string) {
    const ref = doc(this.firestore, `trackings/${id}`);
    return deleteDoc(ref);
  }
}
