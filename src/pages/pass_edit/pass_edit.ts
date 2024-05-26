import "./pass_edit.css";
import {Input, Button} from "../../components"
import Block from "../../core/Block";
import * as validation from "../../utils/validation.ts";
import { changePassword } from "../../services/profile";
import { connect } from "../../utils/connect.ts";
class PassEditPage extends Block {
    init() {
        const onChangePasswordBind = this.onChangePassword.bind(this);
        const onBackClickBind = this.onBackClick.bind(this);

        const onSubmitBind = this.onSubmit.bind(this);

        const oldPassword = new Input({ 
            label:"Старый пароль", 
            placeholder:"·······", 
            class:"pass_edit_input", 
            name:"oldPassword", 
            type: "password", 
            onBlur: onChangePasswordBind 
        });

        const newPassword = new Input({ 
            label:"Новый пароль", 
            placeholder:"·······", 
            class:"pass_edit_input", 
            name:"newPassword", 
            type: "password", 
            onBlur: onChangePasswordBind 
        });

        const repeatPassword = new Input({ 
            label:"Повторите пароль", 
            placeholder:"·······", 
            class:"pass_edit_input", 
            name:"repeatPassword", 
            type: "password", 
            onBlur: onChangePasswordBind 
        });

        const buttonEnter = new Button({ 
            label:"Сохранить", 
            type:"primary", 
            onClick: onSubmitBind 
        });

        const buttonBack = new Button({ 
            label:"Назад", 
            type:"secondary", 
            onClick: onBackClickBind 
        });

        this.children = {
            ...this.children,
            oldPassword, 
            newPassword,
            repeatPassword,
            buttonEnter,
            buttonBack
        }
    }

    onBackClick() {
        (window as any).router.go('/settings');
    }

    onChangePassword(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        const inputName = (event.target as HTMLInputElement).name;
        if (this.is_password_error(inputName, inputValue)) return;
        this.setProps({[inputName]: inputValue});
    }

    is_password_error(name: string, value: string): boolean {
        if(validation.password(value)) {
            this.children[name].setProps({error: false, error_text: null});
            return false;
        } else {
            this.children[name].setProps({error: true, error_text: 'Пароль не соответветствует требованиям'});
            return true;
        }
    }

    onSubmit() {
        if (this.is_password_error('oldPassword', this.props.oldPassword)
            || this.is_password_error('oldPassword', this.props.newPassword)
            || this.is_password_error('oldPassword', this.props.repeatPassword)) {

            return;

        }

        changePassword({
            oldPassword: this.props.oldPassword,
            newPassword: this.props.newPassword,
        })
    }

    render(): string {
        return `
            <main class="pass_edit_container">
                {{#if isLoading }}
                    <h2>SPINNER</h2>
                {{ else }}
                    <Form class="pass_edit_form">
                        <div class="pass_edit_input_container">
                            {{{ oldPassword }}}
                            {{{ newPassword }}}
                            {{{ repeatPassword }}}
                        </div>
                        <div class="pass_edit_btn_container">
                            {{{ buttonEnter }}}
                            {{{ buttonBack }}}
                        </div>
                    </Form>
                {{/if}}
            </main>
        `
    }
}


/**Пропсы из store которые будут тригерить обновление */
const mapStateToProps = (store: any) => {
    return {
        isLoading: store.isLoading,
        passChangeError: store.passChangeError
    }
}

export default connect(mapStateToProps)(PassEditPage);


