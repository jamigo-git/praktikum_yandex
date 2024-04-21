import Block from "../../core/Block";
import "./avatar.css";

export default class Avatar extends Block {
    constructor(props: any) {
        super(props);
    }

    render(): string {
        return `
        <div class="avatar__container">
            <div>
                {{#if avatar}}
                    <img src="{{avatar}}" class="{{class}}" alt="user avatar">
                {{else}}
                    <img src="{{default_avatar}}" class="{{class}}" alt="user avatar">
                {{/if}}
            </div>

            {{#if label}}<div class="avatar_label">{{label}}</div>{{/if}}
        </div>

        `
    }
}
