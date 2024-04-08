import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthApiService } from '../../services/auth/auth.api.service';
// import { LoginRequest } from '../../models/auth/login.request.model';
// import { LoginResponse } from '../../models/auth/login.response.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatButtonModule, CommonModule, MatFormFieldModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})

export class AuthComponent {
  activeForm: string = 'login';
  //authApiSvc: AuthApiService;

  toggleForm(formType: string) {
    this.activeForm = formType;

  }

  // login() {
  //   this.authApiSvc.login().subscribe(response => {
  //     const jwt = response.jwt;
  //     localStorage.setItem('jwt', jwt); // Don't do this in production
  //   });
  //   // this.authApiSvc.login(new LoginRequest());
  // }
}
