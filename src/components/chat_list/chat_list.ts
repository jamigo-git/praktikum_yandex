import Block from "../../core/Block";
import type { Props } from "../../core/Block";

export default class ChatList extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: props.onClick
            }
        })
    }

    render(): string {
        const showEmpty = this.props.chats.length === 0;
        return `
            <div class="chat_items_container">
                {{#if ${showEmpty}}}
                    <h3> чатов нет </h3>
                {{else}}
                    <ul class="chat-list">
                        {{{ chats }}}
                    </ul>
                {{/if}}
            </div>
        `;
    }
}

