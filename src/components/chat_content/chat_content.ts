import Block, { Props } from "../../core/Block";
import { Input, ButtonNav, Avatar, Dropdown, DropdownItem, MessageList } from "../../components";
import { onSubmitMessage, onAddUser, onDeleteUser, loadAllData } from "../../services/chat";
import { connect } from "../../utils/connect";
import  AddUserModal from "./add_user_modal.ts";
import  DeleteUserModal from "./delete_user_modal.ts";
import { ChatDTO } from "src/api/type.ts";
import isEqual from "../../utils/isEqual";
import type { Message}  from "../../api/type"
import { ChatMessage } from "../message";
import { BASEURL } from "../../core/Constants.ts";

class ChatContent extends Block {

    constructor(props: any) {
        super({
            ...props,
        });
    }

    /**Запус загрузки чатов после отрисовки компонента в DOM */
    componentDidMount(oldProps: Props): void {
        oldProps;
        if (this.props.selectedChatId) loadAllData();
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (this.props.selectedChatId && oldProps.selectedChatId !== newProps.selectedChatId) {
            loadAllData();
        }
        /**Если пришло обновление по сообщениям обновим messageList */
        if (!isEqual(oldProps.selectedChatMessages, newProps.selectedChatMessages)) {
            this.children.messageList.setProps({ messages: this.mapMessageToComponent(newProps.selectedChatMessages) });
        }
        const chat = (this.props.chats as ChatDTO[])?.find(f => f.id === this.props.selectedChatId);
        const avatar_img = chat?.avatar ? `${BASEURL}resources${chat.avatar}` : undefined;
        this.children.avatar.setProps({ avatar: avatar_img });
        return true;
    }

    mapMessageToComponent(messages: Message[] | undefined) {
        return messages?.sort((a,b) => (a.id - b.id)).map(({ content, user_id, time, id }) => new ChatMessage({ text: content, datatime: time, user_id, id }));
    }

    init() {
        const onChangeMessageBind = this.onChangeMessage.bind(this);
        const onSubmitBind = this.onSubmitMessage.bind(this);
        const onAddUserBind = onAddUser.bind(this);
        const onDeleteUserBind = onDeleteUser.bind(this);

        /**Children */
        const avatar = new Avatar({ class:"avatar_chat_content_header" });
        const buttonChatSettings = new ButtonNav({ class: "chat_header_menu" });

        /**Send message elements */
        const buttonAdd = new ButtonNav({ class: "chat_footer_add" });
        const inputMessage = new Input({ placeholder: "Сообщение", class: "chat_content_send_message", name: "message", id: "input_send_message", onBlur: onChangeMessageBind });
        const buttonSubmit = new ButtonNav({ class: "chat_footer_send", onClick: onSubmitBind });
        
        /**Messages */
        const messages_from_store = (window as any).store.state.selectedChat?.messages;
        const messages = this.mapMessageToComponent(messages_from_store);
        const messageList = messages ? new MessageList({ messages: messages }) : new MessageList({ });

        /**Dropdown elements */
        const addUser = new DropdownItem({label: "Добавить пользователя", onClick: onAddUserBind });
        const deleteUser = new DropdownItem({label: "Удалить пользователя", onClick: onDeleteUserBind });
        const chatInfo = new DropdownItem({label: "Информация о чате" });
        const dropdown = new Dropdown({dropdownItems: [addUser, deleteUser, chatInfo] });

        /**Modal windows */
        const addUserModal = new AddUserModal({});
        const deleteUserModal = new DeleteUserModal({});

        this.children = {
            ...this.children,
            avatar,
            buttonChatSettings,
            buttonAdd,
            inputMessage,
            dropdown,
            buttonSubmit,
            addUserModal,
            deleteUserModal,
            messageList
        }

    }

    onChangeMessage(event: any) {
        const input_value = event.target.value;
        (window as any).store.set({lastMessage: input_value});
        // this.setProps({message: input_value});
    }

    onSubmitMessage(event: any) {
        const input_value = (window as any).store.state.lastMessage;
        if(input_value) {
            this.children.inputMessage.setProps({error: false, error_text: null});
            onSubmitMessage(event);
        } else {
            this.children.inputMessage.setProps({error: true, error_text: 'Невозможно отправить пустое сообщение'});
            return;
        }
    }

    render(): string {
        const chatTitle = (this.props.chats as ChatDTO[])?.find(f => f.id === this.props.selectedChatId)?.title || 'Без названия';
        return `
        <div class="chat_content">
            {{#if selectedChatId }}
                <header class="chat_content_header">
                    {{{ avatar }}}
                    <div class="chat_content_header_label">${ chatTitle }</div>
                    {{!-- <div class="chat_content_settings"> Settings </div> --}}
                    <div class="dropdown">
                        {{{ buttonChatSettings }}}
                        {{{ dropdown }}}
                    </div>
                </header>
                <main class="messageList">
                    {{{ messageList }}}
                </main>
                <footer class="chat_content_footer">
                    {{{ buttonAdd }}}
                    {{{ inputMessage }}}
                    {{{ buttonSubmit }}}
                </footer>
                {{#if showAddUserModal }}
                    <div class="modal_window_container"> {{{ addUserModal }}} </div>
                {{/if}}            
                {{#if showDeleteUserModal }}
                    <div class="modal_window_container"> {{{ deleteUserModal }}} </div>
                {{/if}}
            {{else}}
                <h2>Выберите чат чтобы начать общение</h2>
            {{/if}}
        </div>
        `
    }
}


/**Пропсы из store которые будут тригерить обновление */
const mapStateToProps = (store: any) => {
    return {
        activeChatContent: store.activeChatContent,
        showAddUserModal: store.showAddUserModal,
        showDeleteUserModal: store.showDeleteUserModal,
        isLoading: store.isLoading,
        selectedChatId: store.selectedChatId,
        chats: store.chats,
        selectedChatMessages: store.selectedChat.messages,
        selectedChat: store.selectedChat
    }
}

export default connect(mapStateToProps)(ChatContent);
