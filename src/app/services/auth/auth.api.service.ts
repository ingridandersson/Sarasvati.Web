import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../environments/environment.local";
import { Observable } from "rxjs";
import { LoginRequest } from "../../models/auth/login.request.model";
import { LoginResponse } from "../../models/auth/login.response.model";

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    private http = inject(HttpClient);
    private authUrl: string = environment.baseUrl + 'api/auth';
    // 'https://localhost:5001/api/auth';

    login(login: LoginRequest): Observable<any> {
        const url = this.authUrl + '/login';
        return this.http.get<LoginResponse>(url);
    }

    register(login: LoginRequest): Observable<any> {
        const url = this.authUrl + '/register';
        return this.http.post<LoginResponse>(url, login);
    }
    // login(username: string, password: string): Observable<any> {
    //     const url = this.authUrl + '/login';
    //     return this.http.post(url, { username, password });
    // }

    // register(username: string, password: string) {
    //     const url = this.authUrl + '/register';
    //     return this.http.post(url, { username, password });
    // }

    // logout() {
    //     const url = this.authUrl + '/logout';
    //     return this.http.post(url, null);
    // }

    // resetPassword(username: string) {
    //     const url = this.authUrl + '/reset-password';
    //     return this.http.post(url, { username });
    // }

    // acknowledgeNewUser(username: string, token: string) {
    //     const url = this.authUrl + '/acknowledge';
    //     return this.http.get(url, { username, token });
    // }

    // acknowledgeNewPassword(username: string, token: string) {
    //     const url = this.authUrl + '/acknowledge';
    //     return this.http.get(url, { username, token });
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