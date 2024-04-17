import { Injectable, inject } from "@angular/core";
import { AuthApiService } from "./auth.api.service";
import { LoginRequest, RegisterRequest } from "../../models/auth/login.request.model";
import { AcknowledgeResponse, LoginResponse, RegisterResponse } from "../../models/auth/login.response.model";
import { BehaviorSubject, firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiSvc = inject(AuthApiService);
  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor() {
    this.loadInitailUser();
  }
  loadInitailUser() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUserSubject.next(JSON.parse(userData));
    }
  }

  getAuthToken(): string | null {
    const token = localStorage.getItem('access_token');
    console.log('Retrieved token');
    return token;
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    console.log('Checking authentication status with token:', token);
    return !!token;
  }


  // async login(login: LoginRequest): Promise<LoginResponse> {
  //   return await firstValueFrom(this.apiSvc.login(login));
  // }

  // getAuthToken(): string | null {
  //   return localStorage.getItem('access_token');
  // }

  // async login(loginRequest: LoginRequest): Promise<LoginResponse> {
  //   const response = await firstValueFrom(this.apiSvc.login(loginRequest));
  //   return response;
  // }


  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const response = await firstValueFrom(this.apiSvc.login(loginRequest));

    if (response && response.jwtToken) {
      localStorage.setItem('access_token', response.jwtToken);
      console.log('Token saved:', response.jwtToken);
    } else {
      console.log('No token received:', response);
    }
    return response;

  }

  // public async register(email: string, phonenumber: string, password: string, confirmPassword: string): Promise<RegisterResponse> {
  //   const registerRequest = { email, phonenumber, password, confirmPassword };
  //   return await firstValueFrom(this.apiSvc.register(registerRequest));
  // }

  public async register(registerData: RegisterRequest): Promise<RegisterResponse> {
    const registerRequest = { registerData };
    console.log('Sending registerRequest:', registerRequest); // Lägg till detta för att se objektet
    return await firstValueFrom(this.apiSvc.register(registerData));
  }


  async acknowledgeNewUser(token: RegisterResponse): Promise<AcknowledgeResponse> {
    return await firstValueFrom(this.apiSvc.acknowledgeUser(token));
  }

  async logout(): Promise<void> {
    localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    console.log('User logged out');
    return Promise.resolve();
  }

}

