import { Inject, Injectable, inject } from "@angular/core";
import { AuthApiService } from "./auth.api.service";
import { LoginRequest } from "../../models/auth/login.request.model";
import { LoginResponse, RegisterResponse } from "../../models/auth/login.response.model";
import { firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiSvc = inject(AuthApiService);
  httpClient = inject(HttpClient);


  async login(login: LoginRequest): Promise<LoginResponse> {
    return await firstValueFrom(this.apiSvc.login(login));
  }

  // I AuthService
  public async register(email: string, password: string, confirmPassword: string): Promise<RegisterResponse> {
    const registerRequest = { email, password, confirmPassword }; // Matchar backend förväntan
    return await firstValueFrom(this.apiSvc.register(registerRequest));
  }
  // public async register(login: LoginRequest): Promise<LoginResponse> {
  //   return await firstValueFrom(this.apiSvc.register(login));
  // }

  async logout(): Promise<void> {
    localStorage.removeItem('jwtToken');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Converts the token to a boolean to indicate if authenticated
  }


}

