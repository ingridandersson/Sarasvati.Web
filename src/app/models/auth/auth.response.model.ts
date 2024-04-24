
export class LoginResponse {
  guid!: string;
  username!: string;
  roles!: string[];
  jwtToken!: string;
  refreshToken!: string;
  token!: string;
}

export class RegisterResponse {
  url!: string;
}

export class AcknowledgeUserResponse {
  token!: string;
  constructor(token: string) {
    this.token = token;
  }
}

export class AcknowledgePasswordResponse {
  token!: string;
  constructor(token: string) {
    this.token = token;
  }
}

export class ResetPasswordResponse {
  url!: string;
}

// export class LogoutResponse {
//   email!: string;
// }


