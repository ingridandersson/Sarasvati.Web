//import { GUID } from "../models/guid.model";
import { LoginRequest } from "../models/auth/login.request.model";
//import { LoginResponse } from "../models/auth/login.response.model";


export interface IAuthService {
  login(email: string, password: string): Promise<LoginRequest>;
  register(email: string, password: string): Promise<LoginRequest>;
}

