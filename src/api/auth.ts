import  HTTPTransport from "../core/HTTPTransport.ts";
import { APIError, CreateUser, LoginRequestData, SignUpResponse, UserDTO } from "./type";

const authApi = new HTTPTransport(`/auth`);

// const delay = (showError: boolean) => new Promise((resolve, reject) => {
//     if(showError) {
//         setTimeout(() => reject(), 2000)
//     } else {
//         setTimeout(() => resolve(), 3000)
//     }
// })

export default class AuthApi {
    async create(data: CreateUser): Promise<XMLHttpRequest> {
        return authApi.post('/signup', {data})
    }

    async login(data: LoginRequestData): Promise<XMLHttpRequest> {
        return authApi.post('/signin', {data});
    }

    async me(): Promise<UserDTO | APIError> {
        return authApi.get('/user');
    }

    async logout(): Promise<void | APIError> {
        return authApi.post('/logout')
    }
}