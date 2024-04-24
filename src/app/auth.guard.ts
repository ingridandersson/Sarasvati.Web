import { Injectable, inject } from '@angular/core';
import { CanMatchFn, Router, } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

export const testGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('Test Guard');

  if (!authService.isAuthenticated() && !authService.isAdmin()) {

    router.navigate(['/login']);
    return false;
  }
  console.log('User is authenticated & is admin');
  return true;

}


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(): boolean {
    if (!this.authService.isAuthenticated() && !this.authService.isAdmin()) {

      this.router.navigate(['/login']);
      return false;
    }
    console.log('User is authenticated & is admin');
    return true;
  }
}
