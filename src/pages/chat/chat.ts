import { connect } from "../../utils/connect";
import  isEqual from "../../utils/isEqual";
import { Input, ButtonNav, ButtonMenu, ChatList, ChatItem, Dropdown, DropdownItem, ChatContent} from "../../components";
import Block, { Props }  from "../../core/Block";
import { getChats, onCreateChatClick, onDeleteChatClick, onLogoutClick, onProfileClick, onChatClick } from "../../services/chat";
import { ChatItemData } from "../../main.ts";
import  CreateChatModal from "../../pages/chat/create_chat_modal.ts";
import  DeleteChatModal from "../../pages/chat/delete_chat_modal.ts";
import { BASEURL } from "../../core/Constants.ts";

class ChatPage extends Block {

    /**Запус загрузки чатов после отрисовки компонента в DOM */
    componentDidMount(oldProps: Props): void {
        oldProps;
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
        return chats?.map(({ title, avatar, datetime, text, unread_count, id }) => new ChatItem({label: title, avatar: avatar ? `${BASEURL}/resources/${avatar}` : undefined, datetime, text, counter: unread_count, click: handler, id}))
    }

    init() {
        /**Chatlist functions */
        const onChatClickBind = onChatClick.bind(this);
        const onLogoutBind = onLogoutClick.bind(this);
        const onProfileBind = onProfileClick.bind(this);

        /**Dropdown functions */
        const onCreateChatBind = onCreateChatClick.bind(this);
        const onDeleteChatBind = onDeleteChatClick.bind(this);
        
        const buttonBack = new ButtonNav({ class: "button_back" });
        
        /**Selected chat content */
        const chatContent = new ChatContent({  });
        
        /**Chatlist elements */        
        const chatList = new ChatList({chats: this.mapChatToComponent(this.props.chats, onChatClickBind) || []});
        const buttonMenu = new ButtonMenu({ });
        const inputSearch = new Input({ placeholder:"Поиск", class:"chat_search_input", name:"search" });
        
        /**Modal windows */
        const createChatModal = new CreateChatModal({});
        const deleteChatModal = new DeleteChatModal({});

        /**Dropdown elements */
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
            createChatModal,
            deleteChatModal,
            createChat,
            deleteChat,
            logout,
            userInfo,
            dropdown,
            chatContent
        }
    }

    render() {

        return `
            <div>
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
                    {{{ chatContent }}} 
                    {{#if showCreateChatModal }}
                        <div class="modal_window_container"> {{{ createChatModal }}} </div>
                    {{/if}}
                    {{#if showDeleteChatModal }}
                        <div class="modal_window_container"> {{{ deleteChatModal }}} </div>
                    {{/if}}
                </main>
            </div>
        `
    }
}

/**Пропсы из store которые будут тригерить обновление */
const mapStateToProps = (store: any) => {
    return {
        chats: store.chats,
        showCreateChatModal: store.showCreateChatModal,
        showDeleteChatModal: store.showDeleteChatModal,
        selectedChatId: store.selectedChatId
    }
}

export default connect(mapStateToProps)(ChatPage);
