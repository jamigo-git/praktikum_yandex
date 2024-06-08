import Block from "../../core/Block";
import type { Props } from "../../core/Block";

export default class ChatMessage extends Block {
    constructor(props: Props) {
        super(props);
    }

    render(): string {
        const currentUser = window.store.state.user;
        const messageClass = this.props.user_id === currentUser?.id ? "message_current_user" : "";
        return `
            <div id="{{ id }}" data-userid="{{ user_id }}" class="message ${messageClass}">
                {{#if text}}<div class="message_text">{{text}}</div>{{/if}}
                {{#if datetime}}<div class="message_datetime">{{datetime}}</div>{{/if}}
                {{#if image}}<img class="message_image" src="{{image}}"></img>{{/if}}
            </div>
        `;
    }
}
