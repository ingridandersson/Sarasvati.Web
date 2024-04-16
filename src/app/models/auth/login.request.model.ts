export class LoginRequest {
  email!: string;
  password!: string;
}

export class RegisterRequest {
  email!: string;
  phonenumber!: string;
  password!: string;
  confirmPassword!: string;
}
