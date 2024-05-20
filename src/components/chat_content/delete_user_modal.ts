import { connect } from "../../utils/connect";
import Block from "../../core/Block";
import { Input, FormWrapper, ModalWindow, Button } from "..";
import { onDeleteUser, onChangeUserName, onSubmitDeleteUser } from "../../services/chat";

class DeleteUserModal extends Block {
    init() {
        const onChangeNameBind = onChangeUserName.bind(this);
        const onSubmitBind = onSubmitDeleteUser.bind(this);

        const modalBody = new Input({ 
            placeholder: "Введите логин пользователя", 
            class: "input_user_login", 
            name: "userLogin", 
            onBlur: onChangeNameBind 
        });

        const button = new Button({ 
            label:"Удалить", 
            type:"primary", 
            bnt_type: "submit", 
            onClick: onSubmitBind 
        });

        const formWrapper = new FormWrapper({
            formBody: new ModalWindow({modalBody: modalBody, button: button, title: "Удалить пользователя из чата"}),
            onSubmit: (event: any) => {
                event.preventDefault();
                onDeleteUser({});
            }
        });

        this.children = {
            ...this.children,
            formWrapper
        }
    }

    render() {
        return `
            <div class="create_chat_modal">
                {{#if isLoading}}
                    <h2>SPINER</h2>
                {{else}}
                    {{{ formWrapper }}}
                    {{#if deleteUserError}}
                        <p>{{{ deleteUserError }}}</p>
                    {{/if}}
                {{/if}}
            </div>
        `
    }
}

/**Пропсы из store которые будут тригерить обновление */
const mapStateToProps = (store: any) => {
    return {
        isLoading: store.isLoading,
        deleteUserError: store.deleteUserError,
    }
}

export default connect(mapStateToProps)(DeleteUserModal);
