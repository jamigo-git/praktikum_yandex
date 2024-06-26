import Block from "../../core/Block";
import "./avatar.css";
import type { Props } from "../../core/Block";

export default class Avatar extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: props.onClick
            }
        });
    }

    render(): string {
        return `
        <div class="avatar-container">
            <div>
                {{#if avatar}}
                    <img src="{{ avatar }}" class="{{ class }}" alt="user avatar">
                {{else}}
                    <img src="{{ default_avatar }}" class="{{ class }}" alt="user avatar">
                {{/if}}
            </div>

            {{#if label}}<div class="avatar-label">{{ label }}</div>{{/if}}
        </div>

        `;
    }
}
