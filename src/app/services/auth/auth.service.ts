import { Inject, Injectable, inject } from "@angular/core";
import { AuthApiService } from "./auth.api.service";
import { LoginRequest } from "../../models/auth/login.request.model";
import { LoginResponse } from "../../models/auth/login.response.model";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiSvc = inject(AuthApiService);
  async login(login: LoginRequest): Promise<LoginResponse> {
    return await firstValueFrom(this.apiSvc.login(login));
  }

  public async register(login: LoginRequest): Promise<LoginResponse> {
    return await firstValueFrom(this.apiSvc.register(login));
  }

  async logout(): Promise<void> {
    localStorage.removeItem('jwtToken');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Converts the token to a boolean to indicate if authenticated
  }


}

