import { connect } from "../../utils/connect";
import Block from "../../core/Block";
import { FormWrapper, ModalWindow, Button, FormString } from "../../components";
import { deleteChat } from "../../services/chat";

class DeleteChatModal extends Block {

    init() {
        const onDeleteBind = this.onDelete.bind(this);

        const button = new Button({ label:"Удалить", type:"primary", onClick: onDeleteBind });
        const modalBody = new FormString({label: "Внимание!", value: "Выбранный чат будет удален"});

        const formWrapper = new FormWrapper({
            formBody: new ModalWindow({modalBody: modalBody, button: button, title: `Удалить выбранный чат ${(window as any).store.state.selectedChatId}?`}),
            onSubmit: (event: any) => {
                const chatId = (window as any).store.state.selectedChatId;
                event.preventDefault();
                deleteChat({ chatId: chatId })
            }
        });

        this.children = {
            ...this.children,
            formWrapper
        }
    }

    onDelete() {
        const chatId = (window as any).store.state.selectedChatId;
        if (chatId) deleteChat({chatId: chatId});
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