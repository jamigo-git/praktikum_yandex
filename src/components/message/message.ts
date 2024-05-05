import Block from "../../core/Block";
import type { Props } from "../../core/Block";

export default class Message extends Block {
    constructor(props: Props) {
        super(props);
    }

    render(): string {
        return `
            <div class="message {{#if class}}{{class}}{{/if}}">
                {{#if text}}<div class="message_text">{{text}}</div>{{/if}}
                {{#if datetime}}<div class="message_datetime">{{datetime}}</div>{{/if}}
                {{#if image}}<img class="message_image" src="{{image}}"></img>{{/if}}
            </div>
        `;
    }
}
