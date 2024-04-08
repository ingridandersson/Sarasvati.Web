import { Injectable, inject } from "@angular/core";
import { AuthApiService } from "./auth.api.service";
import { LoginRequest } from "../../models/auth/login.request.model";
import { LoginResponse } from "../../models/auth/login.response.model";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiSvc = inject(AuthApiService);

    //Don't forget guards and interceptors

    async login(login: LoginRequest): Promise<LoginResponse> {
        return await firstValueFrom(this.apiSvc.login(login));
    }

    async register(login: LoginRequest): Promise<LoginResponse> {
        return await firstValueFrom(this.apiSvc.register(login));
    }

    async logout(): Promise<void> { }
    // async login(email: string, password: string): Promise<LoginResponse> {
    //     return await firstValueFrom(this.apiSvc.login(email, password));
    // }
}