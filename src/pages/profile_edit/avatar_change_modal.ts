import { connect } from "../../utils/connect";
import Block from "../../core/Block";
import { Input, FormWrapper, ModalWindow, Button } from "../../components";

class AvatarChangeModal extends Block {
    init() {
        const onSubmitBind = this.onSubmit.bind(this);

        const modalBody = new Input({ 
            name: "file", 
            type: 'file'
        });

        const button = new Button({ 
            label:"Изменить", 
            type:"primary", 
            onClick: onSubmitBind 
        });
        

        const formWrapper = new FormWrapper({
            formBody: new ModalWindow({
                modalBody: modalBody, 
                button: button, 
                title: "Изменить аватар"
            }),
            onSubmit: (event: any) => {
                event.preventDefault();
                // createChat({title: this.props.chatName})
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
            // changeAvatar({ title: this.props.chatName });
        }

    }

    onChangeName(event: any) {
        const inputValue = event.target.value;
        this.setProps({ chatName: inputValue });
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