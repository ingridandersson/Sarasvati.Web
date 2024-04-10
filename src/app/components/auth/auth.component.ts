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

  isLoginMode: boolean = true; // Kontrollerar vilket formulär som visas

  // authService = Inject(AuthService) as IAuthService;

  // constructor(private authService: AuthService) { }
  // router = inject(Router);


  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }


  toggleForm(formType: string) {
    this.activeForm = formType;
    this.isLoginMode = formType === 'login';
    if (this.isLoginMode) {
      this.router.navigate(['/auth/login']);
    }
    else {
      this.router.navigate(['/auth/register']);

    }
  }


  async onSubmit() {
    console.log("Submit!");
    if (this.isLoginMode) {
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
          // Här kan du lägga till mer användarvänlig felhantering
        }
      }
    }
    else {
      console.log('Signup mode');
      if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirmPassword) {
        try {
          const response = await this.authService.register(
            this.signupForm.value.email as string,
            this.signupForm.value.password as string,
            this.signupForm.value.confirmPassword as string
          );
          console.log('User registered successfully', response);
          this.router.navigate(['/categories']);
          // Eller om du vill logga in användaren direkt efter registrering,
          // kan du kalla på login-metoden här istället och sedan navigera.
        } catch (error) {
          console.error('Registration Error', error);
          // Här kan du lägga till mer användarvänlig felhantering
        }
      } else {
        console.log('Form is not valid or passwords do not match');
        // Här kan du informera användaren om att formuläret inte är giltigt
        // eller att lösenorden inte matchar
      }
    }
  }



  ////detta är originalet
  // async onSubmit() {
  //   console.log("Submit!");
  //   if (this.isLoginMode) {
  //     console.log('Login mode');
  //     if (this.loginForm.valid) {
  //       const loginRequest: LoginRequest = {
  //         email: this.loginForm.value.email as string,
  //         password: this.loginForm.value.password as string,
  //       };
  //       try {
  //         const response = await this.authService.login(loginRequest);
  //         console.log('User logged in successfully', response);
  //         this.router.navigate(['/categories']);
  //       } catch (error) {
  //         console.error('Login Error', error);
  //       }
  //     }
  //   } else {
  //     console.log('Signup mode');
  //     if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirmPassword) {
  //       const { confirmPassword, ...loginRequest } = this.signupForm.value;
  //       try {
  //         const response = await this.authService.register({
  //           email: loginRequest.email || '', // Ensure email is always of type string
  //           password: loginRequest.password || '', // Ensure password is always of type string
  //         });
  //         console.log('User registered successfully', response);
  //         // Valfritt: Logga in användaren direkt efter registrering eller navigera till inloggningssidan
  //         this.router.navigate(['/categories']);
  //       } catch (error) {
  //         console.error('Registration Error', error);
  //       }
  //     } else {
  //       console.log('Form is not valid or passwords do not match');
  //     }
  //   }
  // }


  // async onSubmit() {
  //   console.log("Submit!");
  //   try {
  //     if (this.activeForm === 'signup' && this.signupForm.valid) {
  //       const loginRequest: LoginRequest = {
  //         email: this.signupForm.value.email ?? '',
  //         password: this.signupForm.value.password ?? '',
  //       };

  //       const response = await this.authService.register(loginRequest);
  //       console.log('User registered successfully', response);
  //     } else if (this.activeForm === 'login' && this.loginForm.valid) {
  //       const loginRequest: LoginRequest = {
  //         email: this.loginForm.value.email ?? '',
  //         password: this.loginForm.value.password ?? '',
  //       };
  //       const response = await this.authService.login(loginRequest);
  //       console.log('User logged in successfully', response);
  //       this.router.navigate(['/categories']);
  //       this.router.navigate(['/categories']);
  //     } else {
  //       console.log('Form is not valid');
  //     }
  //   } catch (error) {
  //     console.error('Error', error);
  //   }
  // }

}
