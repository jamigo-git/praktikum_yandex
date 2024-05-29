import Block, { Props } from "../../core/Block";

export default class MessageList extends Block {

    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: props.onClick
            }
        });
    }

    render(): string {
        const showEmpty = !this.props.messages || this.props.messages.length === 0;
        return `
        <div class="message_list_container">
            {{#if ${showEmpty} }}
                <h3> сообщений нет </h3>
            {{ else }}
                <ul class="message_list">
                    {{{ messages }}}
                </ul>
            {{/if }}
        </div>
        `;
    }
}

