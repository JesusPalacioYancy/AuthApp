import { User } from "./user.interface";

export interface LoguinResponse {
    user:  User;
    token: string;
};
