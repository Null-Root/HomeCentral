import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HomeTrackingService } from '@src/app/services/home-tracking.service';
import { HomeTracking } from '@src/app/models/home-tracking.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tracking-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tracking-form.view.html',
  styleUrls: ['./tracking-form.view.css'],
})
export class TrackingFormView implements OnInit {
  trackingForm: FormGroup;
  trackingId: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private trackingService: HomeTrackingService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.trackingForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.trackingId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.trackingId;

    if (this.isEditMode && this.trackingId) {
      this.trackingService.getAll().subscribe(trackings => {
        const tracking = trackings.find(t => t.id === this.trackingId);
        if (tracking) this.trackingForm.patchValue({ name: tracking.name });
      });
    }
  }

  saveTracking(): void {
    const name = this.trackingForm.value.name;
    if (this.isEditMode && this.trackingId) {
      this.trackingService.update({ id: this.trackingId, name } as HomeTracking)
        .subscribe(() => this.router.navigate(['/trackings']));
    } else {
      this.trackingService.create({ name, createdBy: 'demo@example.com', allowedUsers: [] } as HomeTracking)
        .subscribe(() => this.router.navigate(['/trackings']));
    }
  }

  cancel(): void {
    this.router.navigate(['/trackings']);
  }
}
