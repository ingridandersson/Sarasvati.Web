import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../environments/environment.local";
import { Observable } from "rxjs";
import { LoginRequest, RegisterRequest, ResetPasswordRequest } from "../../models/auth/login.request.model";
import { AcknowledgePasswordResponse, AcknowledgeUserResponse, LoginResponse, RegisterResponse, ResetPasswordResponse } from "../../models/auth/login.response.model";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private http = inject(HttpClient);
  private authUrl: string = environment.baseUrl + 'auth';

  login(login: LoginRequest): Observable<LoginResponse> {
    const url = `${this.authUrl}/users/login`;
    return this.http.post<LoginResponse>(url, login);
  }

  register(registerData: RegisterRequest): Observable<RegisterResponse> {
    const url = `${this.authUrl}/users/register`;
    return this.http.post<RegisterResponse>(url, registerData);
  }

  acknowledgeUser(tokenUrl: string): Observable<AcknowledgeUserResponse> {
    return this.http.get<AcknowledgeUserResponse>(tokenUrl);
  }

  acknowledgePassword(tokenUrl: string): Observable<AcknowledgeUserResponse> {
    const url = `${this.authUrl}/auth/password/acknowledge`;
    return this.http.get<AcknowledgeUserResponse>(tokenUrl);
  }

  resetPassword(token: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    const url = `${this.authUrl}/password/reset`;
    return this.http.post<ResetPasswordResponse>(url, token);
  }

  // getUsers() {
  //     const url = this.authUrl + '/users';
  //     return this.http.get(url);
  // }

  // getRoles() {}
  // refreshToken() {
  //     const url = this.authUrl + '/refresh';
  //     return this.http.post(url, null);
  // }

}
