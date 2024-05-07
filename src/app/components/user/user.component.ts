import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent  {
  title = "User Details";
  Mail: string = '';
  
  username: string = '';
  lastname: string ='';
  isAuthenticated: boolean = false;
  private authSubscription!: Subscription;

  goBack(): void {
    this.router.navigate(['categories']);
  }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.currentUserSubject.subscribe(user => {
      console.log('Current user data in subscribtion:', user);
      this.isAuthenticated = !!user;
      this.username = user ? user.firstname ?? '' : '';
      this.lastname = user ? user.lastname ?? '' : '';
      this.Mail = user ? user.email ?? '':'';
      // console.log('User authenticated:', this.isAuthenticated, 'username:', this.username);
    });

  
  

   
}


}
