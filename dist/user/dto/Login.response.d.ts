import { User } from '../entity/user.interface';
export interface LoginResponse {
    token: string;
    user: User;
}
