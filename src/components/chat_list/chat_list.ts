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

// export default class ChatList extends Block {
//     constructor(props: Props) {
//         const chat_items = props.chat_items?.reduce((acc: {[x: string]: ChatItem}, data: ChatItemData) => {
            
//             const component = new ChatItem({
//                 label: data.label, 
//                 avatar: data.avatar, 
//                 text: data.text, 
//                 datetime: data.datetime, 
//                 counter: data.counter,
//                 active: data.active
//             });
//             acc[component._id] = component;
//             return acc;
//         }, {});

//         super({
//             ...props,
//             chatItems: Object.keys(chat_items),
//             ...chat_items
//         });
//     }

//     render(): string {
//         return `
//             <div class="chat_items_container">
//                 <ul class="chat_list">
//                     ${this.props?.chatItems.map((key: ChatItemData) => `{{{ ${key} }}}`).join('')}
//                 </ul>
//             </div>
//         `;
//     }
// }