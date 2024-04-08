import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth/auth.service';
import { IAuthService } from '../../abstract/iauth-service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatButtonModule, CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, AuthService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})

export class AuthComponent {
  activeForm: string = 'login';
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    ConfirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  authService = Inject(AuthService) as IAuthService;


  toggleForm(formType: string) {
    this.activeForm = formType;
  }
  onSubmit() {
    if (this.activeForm === 'signup' && this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe({
        next: (response: any) => {
          console.log('User registered successfully', response);
        },
        error: (error: any) => {
          console.error('Registration error', error);
        }
      });
    } else if (this.activeForm === 'login' && this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log('User logged in successfully', response);
        },
        error: (error: any) => {
          console.error('Login error', error);
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }

}
