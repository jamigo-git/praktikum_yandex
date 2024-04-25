import { Input, ButtonNav, ButtonMenu, ChatList, Avatar, MessageList } from "../../components";
import Block from "../../core/Block";
// import type { Children, Props } from "../../core/Block";

export default class ChatPage extends Block {
    init() {

        const onChangeMessageBind = this.onChangeMessage.bind(this);
        const onSubmitBind = this.onSubmit.bind(this);

        const buttonBack = new ButtonNav({ class: "button_back" });
        const buttonMenu = new ButtonMenu({ });
        const inputSearch = new Input({ placeholder:"Поиск", class:"chat_search_input", name:"search" });
        const chatList = new ChatList(this.props);
        const avatar = new Avatar({class:"avatar_chat_content_header" });
        const buttonChatSettings = new ButtonNav({ class: "chat_header_menu" });
        const messageList = new MessageList(this.props);
        const buttonAdd = new ButtonNav({ class: "chat_footer_add" });
        const inputMessage = new Input({ placeholder:"Сообщение", class:"chat_content_send_message", name:"message", onBlur: onChangeMessageBind});
        const buttonSubmit = new ButtonNav({ class: "chat_footer_send", onClick: onSubmitBind });

        this.children = {
            ...this.children,
            buttonBack,
            buttonMenu,
            inputSearch,
            chatList,
            avatar,
            buttonChatSettings,
            messageList,
            buttonAdd,
            inputMessage,
            buttonSubmit,
        }
    }

    onChangeMessage(event: any) {
        const input_value = event.target.value;
        if(input_value) {
            this.children.inputMessage.setProps({error: false, error_text: null});
        } else {
            this.children.inputMessage.setProps({error: true, error_text: 'Невозможно отправить пустое сообщение'});
            return;
        }
        this.setProps({message: input_value});
    }

    onSubmit() {
        if (!this.props.message) {
            this.children.inputMessage.setProps({error: true, error_text: 'Невозможно отправить пустое сообщение'});
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
                {{{ buttonBack }}}
                <div class="chatList_container">
                    <div class="chat_top_menu">
                        {{{ buttonMenu }}}
                        {{{ inputSearch }}}
                    </div>
                    <div class="chat_item_list">
                        {{{ chatList }}}
                    </div>
                </div>
                <div class="chat_content">
                    <header class="chat_content_header">
                        {{{ avatar }}}
                        <div class="chat_content_header_label">"Label"</div>
                        {{!-- <div class="chat_content_settings">Settings</div> --}}
                        {{{ buttonChatSettings }}}
            
                    </header>
                    <main class="messageList">
                        {{{ messageList }}}
                        {{!-- <p>Выберите чат чтобы начать общение</p> --}}
                    </main>
                    <footer class="chat_content_footer">
                        {{{ buttonAdd }}}
                        {{{ inputMessage }}}
                        {{{ buttonSubmit }}}
                    </footer>
                </div>
            </main>
        `
    }
}
