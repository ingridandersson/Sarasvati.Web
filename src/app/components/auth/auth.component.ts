import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../models/auth/login.request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatButtonModule, CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})

export class AuthComponent {
  //#region Properties
  activeForm: string = 'login';
  isLoginMode: boolean = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  //#endregion

  //#region constructor
  authService = inject(AuthService);
  router = inject(Router);
  //#endregion


  toggleForm(formType: string) {
    this.activeForm = formType;
    if (this.isLoginMode) {
      this.isLoginMode = formType === 'login';
    }
    else {
      this.router.navigate(['/auth/register']);
    }
  }

  async onLoginSubmit() {
    console.log('Login mode');
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        email: this.loginForm.value.email as string,
        password: this.loginForm.value.password as string,
      };
      try {
        const response = await this.authService.login(loginRequest);
        console.log('User logged in successfully', response);
        this.router.navigate(['/categories']);
      } catch (error) {
        console.error('Login Error', error);
      }
    }
  }

  async onSignupSubmit() {
    console.log('Signup mode');
    if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirmPassword) {
      try {
        const response = await this.authService.register(
          this.signupForm.value.email as string,
          this.signupForm.value.password as string,
          this.signupForm.value.confirmPassword as string
        );
        console.log('User registered successfully', response);

        if (response) {
          await this.authService.acknowledgeNewUser(response);
          console.log('Account confirmed successfully');
          // this.router.navigate(['/categories']);
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/auth/login']);
          });
        }
      } catch (error) {
        console.error('Registration Error', error);
      }
    } else {
      console.log('Form is not valid or passwords do not match');
    }
  }
}
