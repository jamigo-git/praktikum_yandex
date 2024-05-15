import Block, { Props } from "../../core/Block";
import { Input, ButtonNav, Avatar, Dropdown, DropdownItem } from "../../components";
import { onSubmitMessage, onAddUser, onDeleteUser, onChatInfo } from "../../services/chat";
import { connect } from "../../utils/connect";
import  AddUserModal from "./add_user_modal.ts";
import  DeleteUserModal from "./delete_user_modal.ts";
import { ChatDTO } from "src/api/type.ts";

class ChatContent extends Block {

    constructor(props: any) {
        super({
            ...props,
            // avatar: new Avatar({ class:"chat_item_avatar", label:"", avatar: props?.avatar }),
            // active: props?.selectedChatId === props?.id,
            // events: { 
            //     click: () => { 
            //         setActiveChat(props.id);
            //         props?.click(props.id);
            //     } 
            // }
        });
    }

    // componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    //     const selectedChatId = (window as any).store.state.selectedChatId;
    //     const chatData = ((window as any).store.state.chats as ChatDTO[]).find(f => f.id === selectedChatId)
    //     // this.chatLabel = chatData?.title;
    //     // this.setProps({chatLabel: chatData?.title})
    //     return true;
    // }

    init() {
        const onChangeMessageBind = this.onChangeMessage.bind(this);
        const onSubmitBind = onSubmitMessage.bind(this);
        const onAddUserBind = onAddUser.bind(this);
        const onDeleteUserBind = onDeleteUser.bind(this);
        const onChatInfoBind = onChatInfo.bind(this);

        const avatar = new Avatar({class:"avatar_chat_content_header" });
        const buttonChatSettings = new ButtonNav({ class: "chat_header_menu" });
        const buttonAdd = new ButtonNav({ class: "chat_footer_add" });
        const inputMessage = new Input({ placeholder:"Сообщение", class:"chat_content_send_message", name:"message", onBlur: onChangeMessageBind});
        const buttonSubmit = new ButtonNav({ class: "chat_footer_send", onClick: onSubmitBind });

        /**Dropdown elements */
        const addUser = new DropdownItem({label: "Добавить пользователя", onClick: onAddUserBind });
        const deleteUser = new DropdownItem({label: "Удалить пользователя", onClick: onDeleteUserBind });
        const chatInfo = new DropdownItem({label: "Информация о чате", onClick: onChatInfoBind }); 
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
            deleteUserModal
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

    render(): string {
        const chatTitle = (this.props.chats as ChatDTO[])?.find(f => f.id === this.props.selectedChatId)?.title || 'Без названия';
        // const chatTitle = 'Не определено'
        return `
        <div class="chat_content">
            {{#if selectedChatId }}
                <header class="chat_content_header">
                    {{{ avatar }}}
                    <div class="chat_content_header_label">${chatTitle}</div>
                    {{!-- <div class="chat_content_settings"> Settings </div> --}}
                    <div class="dropdown">
                        {{{ buttonChatSettings }}}
                        {{{ dropdown }}}
                    </div>
                </header>
                <main class="messageList">
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
        chats: store.chats
    }
}

export default connect(mapStateToProps)(ChatContent);
