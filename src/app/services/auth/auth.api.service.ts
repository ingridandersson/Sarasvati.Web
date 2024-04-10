import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../environments/environment.local";
import { Observable, firstValueFrom } from "rxjs";
import { LoginRequest } from "../../models/auth/login.request.model";
import { LoginResponse, RegisterResponse } from "../../models/auth/login.response.model";

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

  register(login: LoginRequest): Observable<RegisterResponse> {
    const url = `${this.authUrl}/users/register`;
    return this.http.post<RegisterResponse>(url, login);
  }




  logout(logout: any): Observable<any> {
    const url = this.authUrl + '/users/logout';
    return this.http.post(url, this.logout);
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
