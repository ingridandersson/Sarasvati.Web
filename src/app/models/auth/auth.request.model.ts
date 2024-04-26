export class LoginRequest {
  email!: string;
  password!: string;
}

export class RegisterRequest {
  firstname!: string;
  lastname!: string;
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
