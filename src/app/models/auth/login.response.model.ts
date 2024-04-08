export class LoginResponse {
    guid!: string;
    username!: string;
    roles!: string[];
    jwtToken!: string;
    refreshToken!: string;
}

export class RegisterResponse {
    guid!: string;
    username!: string;
    roles!: string[];
    jwtToken!: string;
    refreshToken!: string;
}
