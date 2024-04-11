import { Inject, Injectable, inject } from "@angular/core";
import { AuthApiService } from "./auth.api.service";
import { LoginRequest } from "../../models/auth/login.request.model";
import { AcknowledgeResponse, LoginResponse, RegisterResponse } from "../../models/auth/login.response.model";
import { firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiSvc = inject(AuthApiService);
  httpClient = inject(HttpClient);

  // async login(login: LoginRequest): Promise<LoginResponse> {
  //   return await firstValueFrom(this.apiSvc.login(login));
  // }


  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const response = await firstValueFrom(this.apiSvc.login(loginRequest));
    if (response.token) {
      localStorage.setItem('access_token', response.token);
    }
    return response;
  }

  getAuthToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public async register(email: string, password: string, confirmPassword: string): Promise<RegisterResponse> {
    const registerRequest = { email, password, confirmPassword };
    return await firstValueFrom(this.apiSvc.register(registerRequest));
  }

  async acknowledgeNewUser(token: RegisterResponse): Promise<AcknowledgeResponse> {
    const response = await firstValueFrom(this.apiSvc.acknowledgeUser(token));
    return new AcknowledgeResponse(response.token);
  }

  async logout(): Promise<void> {
    localStorage.removeItem('jwtToken');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}


// async login(loginRequest: LoginRequest): Promise<LoginResponse> {
//   const response = await firstValueFrom(this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest));
//   if (response && response.token) {
//     localStorage.setItem('access_token', response.token);
//   }
//   return response;
// }
// getAuthToken(): string | null {
//   return localStorage.getItem('access_token');
// }