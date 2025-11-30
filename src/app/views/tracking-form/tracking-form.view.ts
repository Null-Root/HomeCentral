import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { HomeTrackingService } from '@src/app/services/home-tracking.service';
import { HomeTracking, AllowedUser, TrackingRole } from '@src/app/models/home-tracking.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tracking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tracking-form.view.html',
  styleUrls: ['./tracking-form.view.css'],
})
export class TrackingFormView implements OnInit {
  trackingForm: FormGroup;
  trackingId: string | null = null;
  isEditMode = false;

  roles: TrackingRole[] = ['guest', 'member', 'admin'];

  constructor(
    private fb: FormBuilder,
    private trackingService: HomeTrackingService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.trackingForm = this.fb.group({
      name: ['', Validators.required],
      allowedUsers: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.trackingId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.trackingId;

    if (this.isEditMode && this.trackingId) {
      this.trackingService.getAll().subscribe(trackings => {
        const tracking = trackings.find(t => t.id === this.trackingId);
        if (tracking) {
          this.trackingForm.patchValue({ name: tracking.name });
          tracking.allowedUsers.forEach(u => this.addAllowedUser(u));
        }
      });
    }
  }

  get allowedUsers(): FormArray {
    return this.trackingForm.get('allowedUsers') as FormArray;
  }

  addAllowedUser(user?: AllowedUser) {
    this.allowedUsers.push(
      this.fb.group({
        email: [user?.email || '', [Validators.required, Validators.email]],
        role: [user?.role || 'member', Validators.required],
      })
    );
  }

  removeAllowedUser(index: number) {
    this.allowedUsers.removeAt(index);
  }

  saveTracking(): void {
    const formValue = this.trackingForm.value;

    const tracking = new HomeTracking(
      formValue.name,
      'demo@example.com',
      formValue.allowedUsers
    );

    if (this.isEditMode && this.trackingId) {
      tracking.id = this.trackingId;
      this.trackingService.update(tracking).subscribe(() => this.router.navigate(['/trackings']));
    } else {
      this.trackingService.create(tracking).subscribe(() => this.router.navigate(['/trackings']));
    }
  }

  cancel(): void {
    this.router.navigate(['/trackings']);
  }
}
