import Block from "../../core/Block";
import { Message } from "..";
import type { Props } from "../../core/Block";

export default class MessageList extends Block {
    constructor(props: Props) {
        const messages = props.messages.reduce((acc: any, data: any) => {
            const component = new Message({
                text: data.text, 
                image: data.image, 
                datetime: data.datetime,
                class: data.class
            });
            acc[component._id] = component;
            return acc;
        }, {});

        super({
            ...props,
            messageKeys: Object.keys(messages),
            ...messages
        });
    }

    render(): string {
        return `
            <div class="message_list_container">
                <ul class="message_list">
                    ${this.props.messageKeys.map((key: string) => `{{{ ${key} }}}`).join('')}
                </ul>
            </div>
        `;
    }
}
