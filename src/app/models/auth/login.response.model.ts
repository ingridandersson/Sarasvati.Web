
export class LoginResponse {
  guid!: string;
  username!: string;
  roles!: string[];
  jwtToken!: string;
  refreshToken!: string;
  token!: string;
}

export class RegisterResponse {
  // guid!: string;
  // email!: string;
  // roles!: string[];
  // jwtToken!: string;
  // refreshToken!: string;
  //token!: string;
  url!: string;
}

export class AcknowledgeResponse {
  token!: string;

  constructor(token: string) {
    this.token = token;
  }
}
