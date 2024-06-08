import Block, { Props } from "../../core/Block";
import { Avatar } from "..";
import { setActiveChat } from "../../services/chat";
import { connect } from "../../utils/connect";
class ChatItem extends Block {
    constructor(props: Props) {
        super({
            ...props,
            avatar: new Avatar({ class:"chat-item-avatar", label:"", avatar: props?.avatar }),
            events: { 
                click: () => { 
                    setActiveChat(props.id);
                    props?.click(props.id);
                } 
            }
        });
    }

    render(): string {
        const isActive = this.props.selectedChatId === this.props?.id;
        return `
            <li class="chat-item {{#if ${isActive} }}chat-item-active{{/if}}">
                {{{ avatar }}}
                <div class="chat-item-label">{{label}}</div>
                <div class="chat-item-text">{{text}}</div>
                <div class="chat-item-datetime">{{datetime}}</div>
                {{#if counter}}<div class="chat-item-counter">{{counter}}</div>{{/if}}
            </li>
        `
    }
}

/**Пропсы из store которые будут тригерить обновление */
const mapStateToProps = (store: any) => {
    return {
        selectedChatId: store.selectedChatId
    }
}

export default connect(mapStateToProps)(ChatItem);

