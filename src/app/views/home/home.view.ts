import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SessionService } from '@src/app/services/session.service';

@Component({
  selector: 'hc-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeView {

  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly session = inject(SessionService);

  protected async googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth as any, provider);
      
      // Set User
      this.session.setUser(
        result.user.uid,
        result.user.displayName || 'Anonymous',
        result.user.email || 'no-email'
      );

      // Navigate to trackings
      await this.router.navigateByUrl('/trackings');
    }
    catch (err: any) {
      alert(`Sign-in failed: ${err?.message ?? err}`);
    }
  }
}
