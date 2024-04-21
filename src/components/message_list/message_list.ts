import Block from "../../core/Block";
import { Message } from "..";

export default class MessageList extends Block {
    constructor(props: any) {
        const messages = props.messages.reduce((acc, data) => {
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
                    ${this.props.messageKeys.map((key) => `{{{ ${key} }}}`).join('')}
                </ul>
            </div>
        `;
    }
}
