import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth/auth.service';
import { IAuthService } from '../../abstract/iuser-service';
import { LoginRequest } from '../../models/auth/login.request.model';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatButtonModule, CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})

export class AuthComponent {
  activeForm: string = 'login';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  authService = Inject(AuthService) as IAuthService;




  toggleForm(formType: string) {
    this.activeForm = formType;
  }
  async onSubmit() {
    console.log("Submit!");
    try {
      if (this.activeForm === 'signup' && this.signupForm.valid) {
        const loginRequest: LoginRequest = {
          email: this.signupForm.value.email ?? '',
          password: this.signupForm.value.password ?? '',
        };

        const response = await this.authService.register(loginRequest.email, loginRequest.password);
        console.log('User registered successfully', response);
      } else if (this.activeForm === 'login' && this.loginForm.valid) {
        const loginRequest: LoginRequest = {
          email: this.loginForm.value.email ?? '',
          password: this.loginForm.value.password ?? '',
        };
        const response = await this.authService.login(loginRequest.email, loginRequest.password);
        alert('User logged in successfully');
        console.log('User logged in successfully', response);
      } else {
        console.log('Form is not valid');
      }
    } catch (error) {
      console.error('Error', error);
    }
  }

}
