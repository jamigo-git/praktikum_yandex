import Block, { Props } from "../../core/Block";
import { ButtonNav, Avatar, Dropdown, DropdownItem, MessageList, SendMessage, FormWrapper } from "../../components";
import { onAddUser, onDeleteUser, loadAllData, onAvatarClick } from "../../services/chat";
import { connect } from "../../utils/connect";
import  AddUserModal from "./add_user_modal.ts";
import  DeleteUserModal from "./delete_user_modal.ts";
import  AvatarChangeModal from "./avatar_change_modal.ts";
import { ChatDTO } from "src/api/type.ts";
import isEqual from "../../utils/isEqual";
import type { Message, UserDTO}  from "../../api/type"
import { ChatMessage } from "../message";
import { BASEURL } from "../../utils/Constants.ts";

class ChatContent extends Block {
    init() {

        const onAddUserBind = onAddUser.bind(this);
        const onDeleteUserBind = onDeleteUser.bind(this);
        const onAvatarClickBind = onAvatarClick.bind(this);

        /**Children */
        const avatar = new Avatar({ class:"avatar-chat-content-header", onClick: onAvatarClickBind });
        const buttonChatSettings = new ButtonNav({ class: "chat-header-menu" });
        
        /**Messages */
        const messages_from_store = window.store.state.selectedChat?.messages;
        const messages = this.mapMessageToComponent(messages_from_store);
        const messageList = messages ? new MessageList({ messages: messages }) : new MessageList({ });

        /**Send messages component */
        const formWrapper = new FormWrapper({
            formBody: new SendMessage({}),
            onSubmit: (event: Event) => {
                event.preventDefault();
                this.children.formWrapper.children.formBody.setProps({
                    is_submit: true,
                    message: (event.target as window).elements.inputSendMessage.value
                });
            }
        });

        /**Dropdown elements */
        const addUser = new DropdownItem({label: "Добавить пользователя", onClick: onAddUserBind });
        const deleteUser = new DropdownItem({label: "Удалить пользователя", onClick: onDeleteUserBind });
        // const chatInfo = new DropdownItem({label: "Информация о чате" });
        const dropdown = new Dropdown({dropdownItems: [addUser, deleteUser] });

        /**Modal windows */
        const addUserModal = new AddUserModal({});
        const deleteUserModal = new DeleteUserModal({});
        const avatarChangeModal = new AvatarChangeModal({});


        this.children = {
            ...this.children,
            avatar,
            buttonChatSettings,
            dropdown,
            addUserModal,
            deleteUserModal,
            messageList,
            formWrapper,
            avatarChangeModal
        }
    }

    /**Запус загрузки чатов после отрисовки компонента в DOM */
    componentDidMount(oldProps: Props): void {
        oldProps;
        if (this.props.selectedChatId) loadAllData();
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (this.props.selectedChatId && oldProps.selectedChatId !== newProps.selectedChatId) {
            loadAllData();
            this.updateChatAvatar();
        }
        /**Если пришло обновление по сообщениям обновим messageList */
        if (!isEqual(oldProps.selectedChatMessages, newProps.selectedChatMessages)) {
            this.children.messageList.setProps({ messages: this.mapMessageToComponent(newProps.selectedChatMessages) });
            setTimeout(this.setLastMessageVisible, 100);
        }

        if (!isEqual(oldProps.selectedChat, newProps.selectedChat) && newProps.selectedChat.avatar) {
            this.updateChatAvatar();
        }

        return true;
    }

    setLastMessageVisible() {
        const element = document.querySelector('.message-current-user:last-child')
        element?.scrollIntoView(true);
    }

    mapMessageToComponent(messages: Message[] | undefined) {
        return messages?.sort((a,b) => (a.id - b.id)).map(({ content, user_id, time, id }) => new ChatMessage({ text: content, datatime: time, user_id, id }));
    }

    onAvatarClick() {
        window.store.set({ showChatAvatarChangeModal: true });
    }

    updateChatAvatar() {
        const chat = (this.props.chats as ChatDTO[])?.find(f => f.id === this.props.selectedChatId);
        const avatar_img = chat?.avatar ? `${BASEURL}resources${chat.avatar}` : undefined;
        this.children.avatar.setProps({ avatar: avatar_img });
    }

    render(): string {
        const chat = (this.props.chats as ChatDTO[])?.find(f => f.id === this.props.selectedChatId);
        const chatTitle = chat?.title || 'Без названия';
        const chatUsersIds: number[] = window.store.state.selectedChat.users;
        const chatUsersLogins = (window.store.state.users as UserDTO[]).filter(f => chatUsersIds.some(q => q === f.id)).map(user => user.login).join(', ');

        return `
        <div class="chat-content">
            {{#if selectedChatId }}
                <header class="chat-content-header">
                    {{{ avatar }}}
                    <div class="chat-content-header-label">${ chatTitle } (${chatUsersLogins})</div>
                    {{!-- <div class="chat-content_settings"> Settings </div> --}}
                    <div class="dropdown">
                        {{{ buttonChatSettings }}}
                        {{{ dropdown }}}
                    </div>
                </header>
                <main class="messageList">
                    {{{ messageList }}}
                </main>
                {{{ formWrapper }}}
                {{#if showAddUserModal }}
                    <div class="modal-window-container"> {{{ addUserModal }}} </div>
                {{/if}}            
                {{#if showDeleteUserModal }}
                    <div class="modal-window-container"> {{{ deleteUserModal }}} </div>
                {{/if}}
                {{#if showChatAvatarChangeModal }}
                    <div class="modal-window-container"> {{{ avatarChangeModal }}} </div>
                {{/if}}
            {{else}}
                <h2>Выберите чат чтобы начать общение</h2>
            {{/if}}
        </div>
        `
    }
}


/**Пропсы из store которые будут тригерить обновление */
const mapStateToProps = (store: window) => {
    return {
        activeChatContent: store.activeChatContent,
        showAddUserModal: store.showAddUserModal,
        showDeleteUserModal: store.showDeleteUserModal,
        showChatAvatarChangeModal: store.showChatAvatarChangeModal,
        selectedChatId: store.selectedChatId,
        chats: store.chats,
        selectedChatMessages: store.selectedChat.messages,
        selectedChat: store.selectedChat
    }
}

export default connect(mapStateToProps)(ChatContent);
