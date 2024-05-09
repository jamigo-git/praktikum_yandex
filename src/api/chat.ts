import  HTTPTransport from "../core/HTTPTransport.ts";
import { APIError, CreateUser, LoginRequestData, UserDTO } from "./type";

const authApi = new HTTPTransport(`/chats`);

export default class ChatApi {
    async get(): Promise<any>  {
        // return authApi.get('', {data});
        return chat_items;
    }

    async create(data: LoginRequestData): Promise<XMLHttpRequest> {
        return authApi.post('', {data});
    }

    async delete(): Promise<UserDTO | APIError> {
        return authApi.get('/user');
    }

    // async logout(): Promise<void | APIError> {
    //     return authApi.post('/logout')
    // }
}

import ava from "../assets/z.jpg";
import fly from "../assets/fly.jpeg";
import robot from "../assets/images.jpeg";
import chatimg from "../assets/chatimg.png";
import { ChatItemData } from "src/main.ts";
const chat_items: ChatItemData[] = [
  {
    label: 'Петрович', 
    avatar: ava, 
    text: 'random text 123...', 
    datetime: '14:43', 
    counter: 2,
    id: 1
  },
  {
    label: 'Василий Иванович',
    avatar: fly, 
    active: true, 
    text: 'random text 123...', 
    datetime: '10:15', 
    counter: 44,
    id: 2
  },
  {
    label: 'Ларгукус', 
    avatar: robot, 
    text: 'random text 123...', 
    datetime: '15 января',
    id: 3
  }
];

const messages = [
  {
    text: `"С ДНЕМ БЕЗДОМНЫХ ТЕБЯ
            …Это мог бы быть текст всратой открытки с котиками в вотсапе, но нет. 
            30 марта - официальный день бездомных 
            Только сейчас об этом узнал, и по совпадению, я как раз снимаю ролик про бездомных) 
            Почему на такую необычную тему? 
            В США бездомные вообще не подходят под стереотипы. Это не те бомжи, что ловят голубей на обед и бормочут 
            “молодой человек, бутылочку не выбрасывайте”`, 
    image: chatimg, 
    datetime: "18:36"
  },
  {
    text: "Жги", 
    class: "message_current_user", 
    datetime: "19:00"
  },
];