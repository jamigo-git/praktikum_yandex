import { WSBASEURL } from "../utils/Constants.ts";
import  HTTPTransport from "../core/HTTPTransport.ts";
import  WSTransport from "../core/WSTransport.ts";
import { CreateChat, DeleteChat, AddUserToChat, OpenWS } from "./type";

const chatApi = new HTTPTransport(`chats`);

export default class ChatApi {
    async get(): Promise<XMLHttpRequest>  {
        return chatApi.get('');
    }

    async create(data: CreateChat): Promise<XMLHttpRequest> {
        return chatApi.post('', { data });
    }

    async delete(data: DeleteChat): Promise<XMLHttpRequest> {
        return chatApi.delete('', { data });
    }

    async addUser(data: AddUserToChat): Promise<XMLHttpRequest> {
        return chatApi.put('/users', { data });
    }

    async deleteUser(data: AddUserToChat): Promise<XMLHttpRequest> {
        return chatApi.delete('/users', { data });
    }

    async getUsers(chatId: number): Promise<XMLHttpRequest> {
        return chatApi.get(`/${chatId}/users`);
    }

    /** Получить токен для открытия WS соединения */
    async getToken(chatId: number): Promise<XMLHttpRequest> {
        return chatApi.post(`/token/${chatId}`);
    }

    /**Запрос на изменение аватара чата */
    async avatarChange(data: FormData): Promise<XMLHttpRequest> {
        const result = chatApi.put('/avatar', { data })
        return result;
    }

    /** Открыть новое соединение */
    async createWS(data: OpenWS) {
        return new WSTransport(`${WSBASEURL}${data.userId}/${data.chatId}/${data.token}`);
    }

}
