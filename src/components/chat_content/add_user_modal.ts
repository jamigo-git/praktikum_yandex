import { connect } from "../../utils/connect";
import Block from "../../core/Block";
import { Input, FormWrapper, ModalWindow, Button } from "..";
import { onChangeUserLogin, addUserToChat } from "../../services/chat.ts"

class AddUserModal extends Block {

    init() {
        const onChangeNameBind = onChangeUserLogin.bind(this);
        const onClickAddUserBind = this.onClickAddUser.bind(this);

        const modalBody = new Input({ 
            placeholder: "Введите логин пользователя", 
            class: "input_user_login", 
            name: "addUserLogin", 
            id: "addUserLogin", 
            onBlur: onChangeNameBind 
        });

        const button = new Button({ 
            label:"Добавить", 
            type:"primary", 
            onClick: onClickAddUserBind 
        });

        const formWrapper = new FormWrapper({
            formBody: new ModalWindow({ modalBody: modalBody, button: button, title: "Добавить пользователя в чат" }),
            class: "form_wrapper_modal",
            onSubmit: (event: Event) => {
                event.preventDefault();
                window.store.set({ addUserLogin: (document.getElementById("addUserLogin") as HTMLInputElement)?.value })
                addUserToChat();
            }
        });

        this.children = {
            ...this.children,
            formWrapper
        }
    }

    onClickAddUser(event: Event) {
        event.preventDefault();
        const inputValue = (document.getElementById("addUserLogin") as HTMLInputElement)?.value;
        if (inputValue) {
            window.store.set({ addUserLogin: inputValue });
            addUserToChat();
        }
    }

    render() {
        return `
            <div class="create_chat_modal">
                {{{ formWrapper }}}
                {{#if addUserError}}
                    <p>{{{ addUserError }}}</p>
                {{/if}}
            </div>
        `
    }
}

/**Пропсы из store которые будут тригерить обновление */
const mapStateToProps = (store: window) => {
    return {
        addUserError: store.addUserError
    }
}

export default connect(mapStateToProps)(AddUserModal);
