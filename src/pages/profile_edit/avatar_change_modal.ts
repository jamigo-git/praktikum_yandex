import { connect } from "../../utils/connect";
import Block from "../../core/Block";
import { Input, FormWrapper, ModalWindow, Button } from "../../components";
import { onChangeAvatar, onSubmitAvatar } from "../../services/profile";

class AvatarChangeModal extends Block {
    init() {
        const onChangeAvatarBind = onChangeAvatar.bind(this);

        const modalBody = new Input({ 
            name: "file", 
            type: "file",
            class: "add_avatar_input",
            onChange: onChangeAvatarBind,
            onClick: onChangeAvatarBind
        });

        const button = new Button({ 
            label: "Сохранить", 
            type: "primary", 
            btn_type: "submit", 
            // onClick: onSubmitBind
        });
        

        const formWrapper = new FormWrapper({
            formBody: new ModalWindow({
                modalBody: modalBody, 
                button: button, 
                title: "Изменить аватар"
            }),
            onSubmit: (event: any) => {
                event.preventDefault();
                onSubmitAvatar();
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
                    <h2>SPINER</h2>
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
        avatarChangeError: store.avatarChangeError
    }
}

export default connect(mapStateToProps)(AvatarChangeModal);
