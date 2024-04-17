import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../environments/environment.local";
import { Observable } from "rxjs";
import { LoginRequest, RegisterRequest } from "../../models/auth/login.request.model";
import { AcknowledgeResponse, LoginResponse, RegisterResponse } from "../../models/auth/login.response.model";

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

  // login(login: LoginRequest): Observable<LoginResponse> {
  //   return this.http.post<LoginResponse>(`${this.authUrl}/login`, login);
  // }

  register(registerData: RegisterRequest): Observable<RegisterResponse> {
    const url = `${this.authUrl}/users/register`;
    return this.http.post<RegisterResponse>(url, registerData);
  }

  acknowledgeUser(token: RegisterResponse): Observable<AcknowledgeResponse> {
    const url = `${this.authUrl}/users/acknowledge`;
    return this.http.get<AcknowledgeResponse>(token.url);
  }

  logout(logout: any): Observable<any> {
    const url = `${this.authUrl}/users/logout`;
    return this.http.post(url, logout);
  }


  // resetPassword(username: string) {
  //     const url = this.authUrl + '/reset-password';
  //     return this.http.post(url, { username });
  // }

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
