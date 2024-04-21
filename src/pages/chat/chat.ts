import { Input, ButtonNav, ButtonMenu, ChatList, Avatar, MessageList } from "../../components";
import Block from "../../core/Block";

export default class ChatPage extends Block {
    constructor(props: any) {

        super({
            ...props,
            button_back: new ButtonNav({ class: "button_back" }),
            button_menu: new ButtonMenu({ }),
            input_search: new Input({ placeholder:"Поиск", class:"chat_search_input", name:"search" }),
            chat_list: new ChatList(props),
            avatar: new Avatar({class:"avatar_chat_content_header"}),
            button_chat_settings: new ButtonNav({ class: "chat_header_menu" }),
            message_list: new MessageList(props),
            button_add: new ButtonNav({ class: "chat_footer_add" }),
            input_message: new Input({ placeholder:"Сообщение", class:"chat_content_send_message", name:"message"}),
            button_send: new ButtonNav({ class: "chat_footer_send" }),
        })
    }

    render() {
        return `
            <main class="chat_container">
                {{{ button_back }}}
                <div class="chat_list_container">
                    <div class="chat_top_menu">
                        {{{ button_menu }}}
                        {{{ input_search }}}
                    </div>
                    <div class="chat_item_list">
                        {{{ chat_list }}}
                    </div>
                </div>
                <div class="chat_content">
                    <header class="chat_content_header">
                        {{{ avatar }}}
                        <div class="chat_content_header_label">"Label"</div>
                        {{!-- <div class="chat_content_settings">Settings</div> --}}
                        {{{ button_chat_settings }}}
            
                    </header>
                    <main class="message_list">
                        {{{ message_list }}}
                        {{!-- <p>Выберите чат чтобы начать общение</p> --}}
                    </main>
                    <footer class="chat_content_footer">
                        {{{ button_add }}}
                        {{{ input_message }}}
                        {{{ button_send }}}
                    </footer>
                </div>
            </main>
        `
    }
}