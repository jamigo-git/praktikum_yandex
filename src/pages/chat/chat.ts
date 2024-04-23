import { Input, ButtonNav, ButtonMenu, ChatList, Avatar, MessageList } from "../../components";
import Block from "../../core/Block";

export default class ChatPage extends Block {
    [x: string]: any;
    // const field_validation_map: Map<string,string> = new Map([
    //     ['input_message', '']
    // ])
    
    init() {

        const on_change_message_bind = this.on_change_message.bind(this);
        const on_submit_bind = this.on_submit.bind(this);

        const button_back = new ButtonNav({ class: "button_back" });
        const button_menu = new ButtonMenu({ });
        const input_search = new Input({ placeholder:"Поиск", class:"chat_search_input", name:"search" });
        const chat_list = new ChatList(this.props);
        const avatar = new Avatar({class:"avatar_chat_content_header" });
        const button_chat_settings = new ButtonNav({ class: "chat_header_menu" });
        const message_list = new MessageList(this.props);
        const button_add = new ButtonNav({ class: "chat_footer_add" });
        const input_message = new Input({ placeholder:"Сообщение", class:"chat_content_send_message", name:"message", onBlur: on_change_message_bind});
        const button_submit = new ButtonNav({ class: "chat_footer_send", onClick: on_submit_bind });

        this.children = {
            ...this.children,
            button_back,
            button_menu,
            input_search,
            chat_list,
            avatar,
            button_chat_settings,
            message_list,
            button_add,
            input_message,
            button_submit,
        }
    }

    on_change_message(event: any) {
        const input_value = event.target.value;
        if(input_value) {
            this.children.input_message.setProps({error: false, error_text: null});
        } else {
            this.children.input_message.setProps({error: true, error_text: 'Невозможно отправить пустое сообщение'});
            return;
        }
        this.setProps({message: input_value});
    }

    on_submit() {
        if (!this.props.message) {
            this.children.input_message.setProps({error: true, error_text: 'Невозможно отправить пустое сообщение'});
            return;
        } else {
            console.log({
                message: this.props.message
            });
        }
        debugger
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
                        {{{ button_submit }}}
                    </footer>
                </div>
            </main>
        `
    }
}
