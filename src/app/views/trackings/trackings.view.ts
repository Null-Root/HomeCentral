import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeTracking } from '@src/app/models/home-tracking.model';
import { HomeTrackingService } from '@src/app/services/home-tracking.service';

@Component({
  selector: 'app-trackings',
  standalone: true,           // <-- must add this
  imports: [CommonModule],    // <-- ngIf/ngFor will work now
  templateUrl: './trackings.view.html',
  styleUrls: ['./trackings.view.css'],
})
export class TrackingsView implements OnInit {
  trackings: HomeTracking[] = [];

  constructor(
    private trackingService: HomeTrackingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTrackings();
  }

  loadTrackings(): void {
    this.trackingService.getAll().subscribe((data) => {
      this.trackings = data;
      console.log('Trackings loaded:', this.trackings);
    });
  }

  onAddTracking(): void {
    this.router.navigate(['/trackings/add']);
  }

  onEditTracking(trackingId: string): void {
    this.router.navigate(['/trackings/edit', trackingId]);
  }

  onViewTracking(trackingId: string): void {
    this.router.navigate(['/trackings', trackingId]);
  }

  onDeleteTracking(trackingId: string): void {
    const tracking = this.trackings.find(t => t.id === trackingId);
    if (!tracking) return;

    if (confirm(`Delete tracking "${tracking.name}"?`)) {
      this.trackingService.delete(trackingId).subscribe(() => {
        this.loadTrackings(); // Refresh the list
      });
    }
  }
}
