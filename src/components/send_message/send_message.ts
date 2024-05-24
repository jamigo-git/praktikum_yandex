import { Input, ButtonNav } from "../index.ts";
import { onSubmitMessage } from "../../services/chat";

import Block, { Props } from "../../core/Block.ts";
import isEqual from "../../utils/isEqual.ts";

export default class SendMessage extends Block {
    init() {
        const onChangeMessageBind = this.onChangeMessage.bind(this);
        const onSubmitBind = this.onSubmitMessage.bind(this);

        /**Send message elements */
        const buttonAdd = new ButtonNav({ class: "chat_footer_add" });

        const inputMessage = new Input({ 
            placeholder: "Сообщение", 
            class: "chat_content_send_message", 
            name: "message", 
            id: "input_send_message", 
            onBlur: onChangeMessageBind 
        });

        const buttonSubmit = new ButtonNav({ 
            class: "chat_footer_send", 
            onClick: onSubmitBind 
        });

        this.children = {
            ...this.children,
            buttonAdd,
            inputMessage,
            buttonSubmit,
        }
    }

    onChangeMessage(event: any) {
        const input_value = event.target.value;
        this.setProps({message: input_value});
        (window as any).store.set({lastMessage: input_value});
    }

    onSubmitMessage(event?: any) {
        event?.preventDefault();
        const input_value = (window as any).store.state.lastMessage;
        if(input_value) {
            this.children.inputMessage.setProps({error: false, error_text: null});
            onSubmitMessage();
        } else {
            this.children.inputMessage.setProps({error: true, error_text: 'Невозможно отправить пустое сообщение'});
            return;
        }
        (window as any).store.set({ lastMessage: '' });

    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (!isEqual(oldProps, newProps)) {
            if (newProps.is_submit) {
                this.onSubmitMessage();
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

