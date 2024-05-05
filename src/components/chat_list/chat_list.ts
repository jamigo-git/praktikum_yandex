import Block from "../../core/Block";
import { ChatItem } from "..";
import type { Props } from "../../core/Block";
import type { ChatItemData } from "src/main";

export default class ChatList extends Block {
    constructor(props: Props) {
        const chat_items = props.chat_items.reduce((acc: {[x: string]: ChatItem}, data: ChatItemData) => {
            
            const component = new ChatItem({
                label: data.label, 
                avatar: data.avatar, 
                text: data.text, 
                datetime: data.datetime, 
                counter: data.counter,
                active: data.active
            });
            acc[component._id] = component;
            return acc;
        }, {});

        super({
            ...props,
            chatItems: Object.keys(chat_items),
            ...chat_items
        });
    }

    render(): string {
        return `
            <div class="chat_items_container">
                <ul class="chat_list">
                    ${this.props.chatItems.map((key: ChatItemData) => `{{{ ${key} }}}`).join('')}
                </ul>
            </div>
        `;
    }
}
