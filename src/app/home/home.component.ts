import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'hc-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  protected async googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth as any, provider);
      const user = result.user;
      console.log('Google sign-in success', user);
      // navigate to the home trackings list after login
      await this.router.navigateByUrl('/trackings');
    } catch (err: any) {
      console.error('Google sign-in error', err);
      alert(`Sign-in failed: ${err?.message ?? err}`);
    }
  }
}
