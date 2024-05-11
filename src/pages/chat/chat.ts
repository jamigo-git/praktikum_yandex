import { connect } from "../../utils/connect";
import  isEqual from "../../utils/isEqual";
import { Input, ButtonNav, ButtonMenu, ChatList, ChatItem,  Avatar, Dropdown, DropdownItem } from "../../components";
import Block, { Props }  from "../../core/Block";
import { getChats, onCreateChatClick, onDeleteChatClick, onLogoutClick, onProfileClick, onChatClick } from "../../services/chat";
import { ChatItemData } from "../../main.ts";
import  CreateChatModal from "../../pages/chat/create_chat_modal.ts";
import  DeleteChatModal from "../../pages/chat/delete_chat_modal.ts";

class ChatPage extends Block {

    /**Запус загрузки чатов после отрисовки компонента в DOM */
    componentDidMount(oldProps: Props): void {
        getChats();
    }

    /**Обновление */
    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        const onChatClickBind = onChatClick.bind(this);
        
        if(!isEqual(oldProps.chats, newProps.chats)) {
            
            this.children.chatList.setProps({
                chats: this.mapChatToComponent(newProps.chats, onChatClickBind) || [],
                showEmpty: newProps.chats.length === 0
            })
        }
        return true;
    }
    
    mapChatToComponent(chats: ChatItemData[] | undefined, handler: Function) {
        return chats?.map(({title, avatar, datetime, text, unread_count, id}) =>  new ChatItem({label: title, avatar, datetime, text, counter: unread_count, click: handler, id}))
    }

    init() {
        const onChatClickBind = onChatClick.bind(this);
        const onChangeMessageBind = this.onChangeMessage.bind(this);
        const onSubmitBind = this.onSubmit.bind(this);
        const onLogoutBind = onLogoutClick.bind(this);
        const onProfileBind = onProfileClick.bind(this);

        /**Dropdown functions */
        const onCreateChatBind = onCreateChatClick.bind(this);
        const onDeleteChatBind = onDeleteChatClick.bind(this);
        
        const chatList = new ChatList({chats: this.mapChatToComponent(this.chats, onChatClickBind) || []});
        const buttonBack = new ButtonNav({ class: "button_back" });
        const buttonMenu = new ButtonMenu({ });
        const inputSearch = new Input({ placeholder:"Поиск", class:"chat_search_input", name:"search" });
        const avatar = new Avatar({class:"avatar_chat_content_header" });
        const buttonChatSettings = new ButtonNav({ class: "chat_header_menu" });
        const buttonAdd = new ButtonNav({ class: "chat_footer_add" });
        const inputMessage = new Input({ placeholder:"Сообщение", class:"chat_content_send_message", name:"message", onBlur: onChangeMessageBind});
        const buttonSubmit = new ButtonNav({ class: "chat_footer_send", onClick: onSubmitBind });
        
        /**Modal windows */
        const createChatModal = new CreateChatModal({});
        const deleteChatModal = new DeleteChatModal({});

        /**Dropdown parameters */
        const createChat = new DropdownItem({label: "Создать чат", onClick: onCreateChatBind});
        const deleteChat = new DropdownItem({label: "Удалить чат", onClick: onDeleteChatBind});
        const userInfo = new DropdownItem({label: "Профиль", onClick: onProfileBind}); 
        const logout = new DropdownItem({label: "Выход", onClick: onLogoutBind});
        const dropdown = new Dropdown({dropdownItems: [createChat, deleteChat, userInfo, logout]});

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
            createChatModal,
            deleteChatModal,
            createChat,
            deleteChat,
            logout,
            userInfo,
            dropdown,
        }
    }

    onChangeMessage(event: any) {

        // const input_value = event.target.value;
        // if(input_value) {
        //     this.children.inputMessage.setProps({error: false, error_text: null});
        // } else {
        //     this.children.inputMessage.setProps({error: true, error_text: 'Невозможно отправить пустое сообщение'});
        //     return;
        // }
        // this.setProps({message: input_value});
    }

    onSubmit() {
        // if (!this.props.message) {
        //     this.children.inputMessage.setProps({error: true, error_text: 'Невозможно отправить пустое сообщение'});
        //     return;
        // } else {
        //     console.log({
        //         message: this.props.message
        //     });
        // }
    }

    render() {

        return `
            <main class="chat_container">
                <div class="chat_item_conteiner">
                    <div class="chat_top_menu">
                        <div class="dropdown">
                            {{{ buttonMenu }}}
                            {{{ dropdown }}}
                        </div>
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
                {{#if showCreateChatModal }}
                    <div class="modal_window_container"> {{{ createChatModal }}} </div>
                {{/if}}
                {{#if showDeleteChatModal }}
                    <div class="modal_window_container"> {{{ deleteChatModal }}} </div>
                {{/if}}
            </main>
        `
    }
}

/**Пропсы из store которые будут тригерить обновление */
const mapStateToProps = (store: any) => {
    return {
        chats: store.chats,
        isLoading: store.isLoading,
        showCreateChatModal: store.showCreateChatModal,
        showDeleteChatModal: store.showDeleteChatModal
    }
}

export default connect(mapStateToProps)(ChatPage);