import { connect } from "../../utils/connect";
import Block, { Props } from "../../core/Block";
import { Input, FormWrapper, ModalWindow, Button } from "..";
import { onChangeUserLogin, onSubmitDeleteUser } from "../../services/chat";
import { UserDTO } from "../../api/type";
import isEqual from "../../utils/isEqual";
import { StoreType } from "src/main";

class DeleteUserModal extends Block {
    init() {
        const onChangeLoginBind = onChangeUserLogin.bind(this);
        const onClickDeleteUserBind = this.onClickDeleteUser.bind(this);

        const modalBody = new Input({ 
            placeholder: "Введите логин пользователя", 
            class: "input-user-login", 
            name: "deleteUserLogin", 
            id: "deleteUserLogin",
            onBlur: onChangeLoginBind 
        });

        const button = new Button({ 
            label:"Удалить", 
            type:"primary", 
            onClick: onClickDeleteUserBind 
        });

        const formWrapper = new FormWrapper({
            formBody: new ModalWindow({ 
                modalBody: modalBody, 
                button: button, 
                title: "Удалить пользователя из чата",
                textBody: `Список пользователей в чате: ${this.getUsersLogins()}`
            }),
            class: "form-wrapper-modal",
            onSubmit: (event: Event) => {
                event.preventDefault();
                window.store.set({ deleteUserLogin: (document.getElementById("deleteUserLogin") as HTMLInputElement)?.value });
                onSubmitDeleteUser();
            }
        });

        this.children = {
            ...this.children,
            formWrapper
        }
    }

    getUsersLogins() {
        const chatUsersIds = window.store.getState()?.selectedChat.users;
        if (!chatUsersIds) return;
        return (window.store.getState()?.users as UserDTO[]).filter(f => chatUsersIds.some(q => q === f.id)).map(user => user.login).join(', ');
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (!isEqual(oldProps.selectedChat, newProps.selectedChat)) {
            this.children.formWrapper.children.formBody.setProps({textBody: `Список пользователей в чате: ${this.getUsersLogins()}`});
        }

        return true;
    }

    onClickDeleteUser(event: Event) {
        event.preventDefault();
        const inputValue = (document.getElementById("deleteUserLogin") as HTMLInputElement)?.value;
        if (inputValue) {
            window.store.set({ deleteUserLogin: inputValue });
            onSubmitDeleteUser();
        }
    }

    render() {
        return `
            <div class="create_chat_modal">
                {{{ formWrapper }}}
                {{#if deleteUserError}}
                    <p>{{{ deleteUserError }}}</p>
                {{/if}}
            </div>
        `
    }
}

/**Пропсы из store которые будут тригерить обновление */
const mapStateToProps = (store: StoreType) => {
    return {
        deleteUserError: store.deleteUserError,
        selectedChat: store.selectedChat
    }
}

export default connect(mapStateToProps)(DeleteUserModal);
