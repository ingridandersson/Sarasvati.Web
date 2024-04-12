import { Injectable, inject } from '@angular/core';
import { Router, } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
