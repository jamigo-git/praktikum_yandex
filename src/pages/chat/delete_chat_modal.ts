import { connect } from "../../utils/connect";
import Block from "../../core/Block";
import { FormWrapper, ModalWindow, Button } from "../../components";
import { deleteChat } from "../../services/chat";

class DeleteChatModal extends Block {

    init() {
        const onDeleteBind = deleteChat.bind(this);

        const button = new Button({ label:"Удалить", type:"primary", onClick: onDeleteBind });
        const modalBody = `<h3>Выбранный чат будет удален</h3>`;

        const formWrapper = new FormWrapper({
            formBody: new ModalWindow({modalBody: modalBody, button: button, title: `Удалить выбранный чат?`}),
            onSubmit: (event: any) => {
                event.preventDefault();
                deleteChat();
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
                    {{#if deleteChatError}}
                        <p>{{{ deleteChatError }}}</p>
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
        deleteChatError: store.deleteChatError,
        selectedChatId: store.selectedChatId
    }
}

export default connect(mapStateToProps)(DeleteChatModal);