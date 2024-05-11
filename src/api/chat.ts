import  HTTPTransport from "../core/HTTPTransport.ts";
import { CreateChat, DeleteChat } from "./type";

const chatApi = new HTTPTransport(`chats`);

export default class ChatApi {
    async get(): Promise<XMLHttpRequest>  {
        return chatApi.get('');
    }

    async create(data: CreateChat): Promise<XMLHttpRequest> {
        return chatApi.post('', {data});
    }

    async delete(data: DeleteChat): Promise<XMLHttpRequest> {
        return chatApi.delete('', {data});
    }
}
