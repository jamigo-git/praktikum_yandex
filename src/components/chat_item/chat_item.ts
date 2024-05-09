import Block from "../../core/Block";
import { Avatar } from "..";
import { setActiveChat } from "../../services/chat";
import { connect } from "../../utils/connect";
class ChatItem extends Block {
    constructor(props: any) {
        super({
            ...props,
            avatar: new Avatar({ class:"chat_item_avatar", label:"", avatar: props?.avatar }),
            // active: props?.selectedChatId === props?.id,
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
            <li class="chat_item {{#if ${isActive} }}chat_item_active{{/if}}">
                {{{ avatar }}}
                <div class="chat_item_label">{{label}}</div>
                <div class="chat_item_text">{{text}}</div>
                <div class="chat_item_datetime">{{datetime}}</div>
                {{#if counter}}<div class="chat_item_counter">{{counter}}</div>{{/if}}
            </li>
        `
    }
}


export default connect(({selectedChatId}) => ({selectedChatId}))(ChatItem);