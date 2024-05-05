import Block from "../../core/Block";
import { Avatar } from "..";

export default class ChatItem extends Block {
    constructor(props: any) {
        super({
            ...props,
            avatar: new Avatar({ class:"chat_item_avatar", label:"", avatar:props.avatar })
        });
    }

    render(): string {
        return `
            <li class="chat_item {{#if active}}chat_item_active{{/if}}">
                {{{ avatar }}}
                <div class="chat_item_label">{{label}}</div>
                <div class="chat_item_text">{{text}}</div>
                <div class="chat_item_datetime">{{datetime}}</div>
                {{#if counter}}<div class="chat_item_counter">{{counter}}</div>{{/if}}
            </li>
        `
    }
}
