import  HTTPTransport from "../core/HTTPTransport.ts";
import { ChangeUserProfile, ChangeUserPassword, UserSearch } from "./type.ts";

const userApi = new HTTPTransport(`user`);

export default class UserApi {
    /**Запрос на изменение данных профиля пользователя */
    async profileChange(data: ChangeUserProfile): Promise<XMLHttpRequest> {
        const result = userApi.put('/profile', { data })
        return result;
    }

    /**Запрос на изменение аватара пользователя */
    async avatarChange(data: FormData): Promise<XMLHttpRequest> {
        const result = userApi.put('/profile/avatar', { data })
        return result;
    }

    /**Запрос на изменение пароля пользователя */
    async passwordChange(data: ChangeUserPassword): Promise<XMLHttpRequest> {
        const result = userApi.put('/password', { data })
        return result;
    }

    /**Поиск пользователя по логину */
    async userSearch(data: UserSearch): Promise<XMLHttpRequest> {
        const result = userApi.post('/search', { data })
        return result;
    }
}

