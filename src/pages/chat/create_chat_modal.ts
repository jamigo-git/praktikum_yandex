import { connect } from "../../utils/connect";
import Block, { Props } from "../../core/Block";
import { Input, FormWrapper, ModalWindow, Button } from "../../components";
import { createChat } from "../../services/chat";
import isEqual from "../../utils/isEqual";

class CreateChatModal extends Block {
    init() {
        const onChangeNameBind = this.onChangeName.bind(this);
        const onCreateBind = this.onCreate.bind(this);

        const modalBody = new Input({ 
            placeholder: "Название чата", 
            class: "input_chat_name", 
            name: "newChatName", 
            onBlur: onChangeNameBind 
        });

        const button = new Button({ label:"Создать", type:"primary", onClick: onCreateBind });
        

        const formWrapper = new FormWrapper({
            formBody: new ModalWindow({modalBody: modalBody, button: button, title: "Создать новый чат"}),
            class: 'form_wrapper_modal',
            onSubmit: (event: any) => {
                event.preventDefault();
                this.setProps({
                    is_submit: true,
                    chatName: event.target.elements.newChatName.value
                })
            }
        });

        this.children = {
            ...this.children,
            formWrapper
        }
    }

    onCreate(event?: any) {
        event?.preventDefault();
        if (this.props.chatName) {
            createChat({ title: this.props.chatName });
        }
    }

    onChangeName(event: any) {
        const inputValue = event.target.value;
        this.setProps({ chatName: inputValue, is_submit: false });
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (!isEqual(oldProps, newProps)) {
            if (newProps.is_submit && newProps.chatName) {
                this.onCreate();
            }
        }
        return true;
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
