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

export class ResetPasswordRequest {
  email!: string;
  password!: string;
  confirmPassword!: string;
}

// export class LogoutRequest {
//   email!: string;
// }
