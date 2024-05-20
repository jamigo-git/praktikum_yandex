import { connect } from "../../utils/connect";
import Block, { Props } from "../../core/Block";
import { Input, FormWrapper, ModalWindow, Button } from "..";
import { onChangeUserName, onSubmitAddUser } from "../../services/chat.ts"

class AddUserModal extends Block {

    init() {
        const onChangeNameBind = onChangeUserName.bind(this);
        const onSubmitBind = onSubmitAddUser.bind(this);

        const modalBody = new Input({ 
            placeholder: "Введите логин пользователя", 
            class: "input_user_login", 
            name: "userLogin", 
            onBlur: onChangeNameBind 
        });

        const button = new Button({ 
            label:"Добавить", 
            type:"primary", 
            bnt_type: "submit",
            // disabled: true,
            onClick: onSubmitBind 
        });

        const formWrapper = new FormWrapper({
            formBody: new ModalWindow({ modalBody: modalBody, button: button, title: "Добавить пользователя в чат" }),
            onSubmit: (event: any) => {
                event.preventDefault();
                onSubmitBind
            }
        });

        this.children = {
            ...this.children,
            formWrapper
        }
    }

    onSubmit(event: any) {
        const inputValue = event.target.value;

        if (inputValue) {
            this.setProps({ chatName: inputValue });
        }
    }



    render() {
        return `
            <div class="create_chat_modal">
                {{#if isLoading}}
                    <h2>SPINER</h2>
                {{else}}
                    {{{ formWrapper }}}
                    {{#if addUserError}}
                        <p>{{{ addUserError }}}</p>
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
        addUserError: store.addUserError,
    }
}

export default connect(mapStateToProps)(AddUserModal);
