import { connect } from "../../utils/connect";
import Block from "../../core/Block";
import { Input, FormWrapper, ModalWindow, Button } from "../../components";
import { onChangeChatAvatar, onSubmitChatAvatar } from "../../services/chat";

class AvatarChangeModal extends Block {
    init() {
        const onChangeAvatarBind = onChangeChatAvatar.bind(this);

        const modalBody = new Input({ 
            name: "file", 
            type: "file",
            class: "add_avatar_input",
            onChange: onChangeAvatarBind,
        });

        const button = new Button({ 
            label: "Сохранить", 
            type: "primary", 
            // onClick: onSubmitBind
        });
        

        const formWrapper = new FormWrapper({
            formBody: new ModalWindow({
                modalBody: modalBody, 
                button: button, 
                title: "Изменить аватар"
            }),
            class: "form_wrapper_modal",
            onSubmit: (event: Event) => {
                event.preventDefault();
                onSubmitChatAvatar();
            }
        });

        this.children = {
            ...this.children,
            formWrapper
        }
    }

    render() {
        return `
            <div class="change_avatar_modal">
                {{#if isLoading}}
                    <h2>SPINNER</h2>
                {{else}}
                    {{{ formWrapper }}}
                    {{#if avatarChangeError}}
                        <p>{{{ avatarChangeError }}}</p>
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
        changeChatAvatarError: store.changeChatAvatarError
    }
}

export default connect(mapStateToProps)(AvatarChangeModal);
