import Block from "../../core/Block";
import type { Props } from "../../core/Block";
import { connect } from "../../utils/connect";

class ChatList extends Block {
    constructor(props: Props) {
        super({
            ...props,
            showEmpty: props.chats.length === 0,
            events: {
                click: props.onClick
            }
        })
    }

    render(): string {
        return `
            <div class="chat_items_container">
                {{#if showEmpty}}
                    <h3> чатов нет </h3>
                {{/if}}
                <ul class="chat_list">
                    {{{ chats }}}
                </ul>
            </div>
        `;
    }
}

export default connect(({isLoading}) => ({isLoading}))(ChatList);
