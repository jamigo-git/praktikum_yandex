import { connect } from "../../utils/connect";
import { Input, ButtonNav, ButtonMenu, ChatList, ChatItem,  Avatar, MessageList } from "../../components";
import Block from "../../core/Block";
// import type { Children, Props } from "../../core/Block";
import { getChats } from "../../services/chat";
import { ChatItemData } from "../../main.ts";


class ChatPage extends Block {

    // chats: ChatItemData[] | undefined;

    /**Запус загрузки чатов после отрисовки компонента в DOM */
    componentDidMount(oldProps: any): void {
        getChats();
    }

    /**Обновление */
    componentDidUpdate(oldProps: any, newProps: any): boolean {
        const onChatClickBind = this.onChatClick.bind(this);
        if(oldProps.chats !== newProps.chats) {
            
            this.children.chatList.setProps({
                chats: this.mapChatToComponent(newProps.chats, onChatClickBind) || [],
                showEmpty: newProps.chats.length === 0
            })
        }

        // if(oldProps?.selectedChatId !== newProps?.selectedChatId) {
        //     this.children.chatList.setProps({
        //         chats: this.mapChatToComponent(newProps.chats, newProps?.selectedChatId, onChatClickBind) || [],
        //     })
        // }

        return true;
    }
    
    mapChatToComponent(chats: ChatItemData[] | undefined, handler: Function) {
        return chats?.map(({label, avatar, datetime, text, counter, id}) =>  new ChatItem({label, avatar, datetime, text, counter, click: handler, id}))
    }

    init() {
        const onChatClickBind = this.onChatClick.bind(this);
        const onChangeMessageBind = this.onChangeMessage.bind(this);
        const onSubmitBind = this.onSubmit.bind(this);
        

        const chatList = new ChatList({chats: this.mapChatToComponent(this.chats, null, onChatClickBind) || []});
        // const messageList = new MessageList(this.props);

        const isShowEmptyChats = this.chats?.length === 0;

        const buttonBack = new ButtonNav({ class: "button_back" });
        const buttonMenu = new ButtonMenu({ });
        const inputSearch = new Input({ placeholder:"Поиск", class:"chat_search_input", name:"search" });
        const avatar = new Avatar({class:"avatar_chat_content_header" });
        const buttonChatSettings = new ButtonNav({ class: "chat_header_menu" });
        const buttonAdd = new ButtonNav({ class: "chat_footer_add" });
        const inputMessage = new Input({ placeholder:"Сообщение", class:"chat_content_send_message", name:"message", onBlur: onChangeMessageBind});
        const buttonSubmit = new ButtonNav({ class: "chat_footer_send", onClick: onSubmitBind });

        this.children = {
            ...this.children,
            buttonBack,
            buttonMenu,
            chatList,
            inputSearch,
            avatar,
            buttonChatSettings,
            // messageList,
            buttonAdd,
            inputMessage,
            buttonSubmit,
        }
    }

    onChatClick(chatId: string) {
        // console.log(chatId)
        // this.setProps({selectedChatId: chatId});
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
        
    }

    render() {
        return `
            <main class="chat_container">
                {{{ buttonBack }}}
                <div class="chat_item_conteiner">
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

/**Пропсы из store которые будут тригерить обновление */
const mapStateToProps = (store: any) => {
    return {
        chats: store.chats,
        isLoading: store.isLoading
    }
}

export default connect(mapStateToProps)(ChatPage);