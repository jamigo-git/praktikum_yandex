import  HTTPTransport from "../core/HTTPTransport.ts";
import { CreateChat, DeleteChat, AddUserToChat } from "./type";

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
}
