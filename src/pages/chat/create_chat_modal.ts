import { connect } from "../../utils/connect";
import Block from "../../core/Block";
import { Input, FormWrapper, ModalWindow, Button } from "../../components";
import { createChat } from "../../services/chat";

class CreateChatModal extends Block {
    init() {
        const onChangeNameBind = this.onChangeName.bind(this);
        const onSubmitBind = this.onSubmit.bind(this);

        const modalBody = new Input({ 
            placeholder: "Название чата", 
            class: "input_chat_name", 
            name: "newChatName", 
            onBlur: onChangeNameBind 
        });

        const button = new Button({ label:"Создать", type:"primary", onClick: onSubmitBind });
        

        const formWrapper = new FormWrapper({
            formBody: new ModalWindow({modalBody: modalBody, button: button, title: "Создать новый чат"}),
            onSubmit: (event: any) => {
                event.preventDefault();
                createChat({title: this.props.chatName})
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
            createChat({ title: this.props.chatName });
        }

    }

    onChangeName(event: any) {
        const inputValue = event.target.value;
        this.setProps({ chatName: inputValue });
    }

    render() {
        return `
            <div class="create_chat_modal">
                {{#if isLoading}}
                    <h2>SPINER</h2>
                {{else}}
                    {{{ formWrapper }}}
                    {{#if createChatError}}
                        <p>{{{ createChatError }}}</p>
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
        createChatError: store.createChatError
    }
}

export default connect(mapStateToProps)(CreateChatModal);