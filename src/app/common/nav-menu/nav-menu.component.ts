import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AngularMaterialComponent } from '../angular-material/angular-material.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [AngularMaterialComponent, MatToolbarModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent implements OnInit, OnDestroy {
  username: string | null = null;
  userSubscription: Subscription | undefined;

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.authSvc.currentUser.subscribe(user => {
      this.username = user ? user.username : null;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  isLoading = false;

  onLogout() {
    this.isLoading = true;
    this.authSvc.logout().then(() => {
      this.router.navigate(['/login']).finally(() => {
        this.isLoading = false;
      });
    }).catch(error => {
      console.error('Error logging out:', error);
      this.isLoading = false;
    });
  }
}

