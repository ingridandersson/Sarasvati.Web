import { Inject, Injectable, inject } from "@angular/core";
import { AuthApiService } from "./auth.api.service";
import { LoginRequest, RegisterRequest, ResetPasswordRequest } from "../../models/auth/login.request.model";
import { AcknowledgePasswordResponse, AcknowledgeUserResponse, LoginResponse, RegisterResponse, ResetPasswordResponse } from "../../models/auth/login.response.model";
import { firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiSvc = inject(AuthApiService)
  httpClient = inject(HttpClient)

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

  public async register(registerData: RegisterRequest): Promise<RegisterResponse> {
    const response = await firstValueFrom(this.apiSvc.register(registerData));
    console.log('Sending registerresponse:', response);
    return response;
  }

  async acknowledgeNewUser(tokenUrl: string): Promise<AcknowledgeUserResponse> {
    return await firstValueFrom(this.apiSvc.acknowledgeUser(tokenUrl));
  }

  async acknowledgeNewPassword(tokenUrl: string): Promise<AcknowledgePasswordResponse> {
    return await firstValueFrom(this.apiSvc.acknowledgePassword(tokenUrl));
  }

  async resetPassword(passwordRequest: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const response = await firstValueFrom(this.apiSvc.resetPassword(passwordRequest));
    console.log('Reset password token:', response);
    return response;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('jwtToken');
  }

}

