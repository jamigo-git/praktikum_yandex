import Block from "../../core/Block";
import type { Props } from "../../core/Block";

export default class ChatMessage extends Block {
    constructor(props: Props) {
        super(props);
    }

    render(): string {
        const currentUser = window.store.getState()?.user;
        const messageClass = this.props.user_id === currentUser?.id ? "message-current-user" : "";
        return `
            <div id="{{ id }}" data-userid="{{ user_id }}" class="message ${messageClass}">
                {{#if text}}<div class="message-text">{{text}}</div>{{/if}}
                {{#if datetime}}<div class="message-datetime">{{datetime}}</div>{{/if}}
                {{#if image}}<img class="message-image" src="{{image}}"></img>{{/if}}
            </div>
        `;
    }
}
