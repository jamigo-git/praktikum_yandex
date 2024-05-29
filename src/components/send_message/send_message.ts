import { Input, ButtonNav } from "../index.ts";
import { onSubmitMessage } from "../../services/chat";

import Block, { Props } from "../../core/Block.ts";
import isEqual from "../../utils/isEqual.ts";

export default class SendMessage extends Block {
    init() {
        const onChangeMessageBind = this.onChangeMessage.bind(this);
        const onClickSendBind = this.onClickSend.bind(this);

        /**Send message elements */
        const buttonAdd = new ButtonNav({ class: "chat_footer_add" });

        const inputMessage = new Input({ 
            placeholder: "Сообщение", 
            class: "chat_content_send_message", 
            name: "message", 
            id: "inputSendMessage",
            onBlur: onChangeMessageBind 
        });

        const buttonSubmit = new ButtonNav({ 
            class: "chat_footer_send", 
            onClick: onClickSendBind
        });

        this.children = {
            ...this.children,
            buttonAdd,
            inputMessage,
            buttonSubmit,
        }
    }

    onChangeMessage(event: Event) {
        const input_value = (event.target as HTMLInputElement).value;
        (window as any).store.set({lastMessage: input_value});
    }

    onClickSend(event?: Event) {
        event?.preventDefault();
        const input_value = (window as any).store.state.lastMessage;
        if(input_value) {
            this.children.inputMessage.setProps({error: false, error_text: null, is_submit: false });
            onSubmitMessage();
        } else {
            this.children.inputMessage.setProps({error: true, error_text: 'Невозможно отправить пустое сообщение', is_submit: false});
            return;
        }
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (!isEqual(oldProps, newProps)) {
            if (newProps.is_submit) {
                this.onClickSend();
            }
        }
        return true;
    }


    render() {
        return `
            <div>
                <footer class="chat_content_footer">
                    {{{ buttonAdd }}}
                    {{{ inputMessage }}}
                    {{{ buttonSubmit }}}
                </footer>
            <div>
        `;
    }
}

