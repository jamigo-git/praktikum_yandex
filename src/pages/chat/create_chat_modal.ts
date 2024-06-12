import { connect } from "../../utils/connect";
import Block from "../../core/Block";
import { Input, FormWrapper, ModalWindow, Button } from "../../components";
import { createChat } from "../../services/chat";

class CreateChatModal extends Block {
    init() {
        const onClickCreateBind = this.onClickCreate.bind(this);

        const modalBody = new Input({ 
            placeholder: "Название чата", 
            class: "input-chat-name", 
            name: "newChatName", 
            id: "newChatName"
        });

        const button = new Button({ 
            label:"Создать", 
            type:"primary", 
            onClick: onClickCreateBind
        });

        const formWrapper = new FormWrapper({
            formBody: new ModalWindow({modalBody: modalBody, button: button, title: "Создать новый чат"}),
            class: 'form-wrapper-modal',
            onSubmit: (event: Event) => {
                event.preventDefault();
                window.store.set({ newChatName: (document.getElementById("newChatName") as HTMLInputElement)?.value })
                createChat();
            }
        });

        this.children = {
            ...this.children,
            formWrapper
        }
    }

    onClickCreate(event: Event) {
        event.preventDefault();
        const inputValue = (document.getElementById("newChatName") as HTMLInputElement)?.value;
        if (inputValue) {
            window.store.set({ newChatName: inputValue });
            createChat();
        }
    }

    render() {
        return `
            <div class="create_chat_modal">
                {{{ formWrapper }}}
                {{#if createChatError}}
                    <p>{{{ createChatError }}}</p>
                {{/if}}
            </div>
        `
    }
}

/**Пропсы из store которые будут тригерить обновление */
const mapStateToProps = (store: any) => {
    return {
        createChatError: store.createChatError
    }
}

export default connect(mapStateToProps)(CreateChatModal);
