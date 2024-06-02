import { Input, Button } from "../index.ts";
import Block, { Props } from "../../core/Block.ts";
import * as validation from "../../utils/validation.ts";
import { login } from "../../services/auth.ts";
import isEqual from "../../utils/isEqual.ts";

export default class FormLogin extends Block {
    init() {
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onChangePassword_bind = this.onChangePassword.bind(this);
        const onClickSendBind = this.onClickSend.bind(this);
        const onRegistrationBind = this.onRegistration.bind(this);

        const inputLogin = new Input({ 
            placeholder: "Логин", 
            class: "login_form_input", 
            name: "login",
            onBlur: onChangeLoginBind,
        });

        const inputPassword = new Input({ 
            placeholder: "Пароль", 
            class: "login_form_input", 
            name: "password", 
            type: "password", 
            onBlur: onChangePassword_bind, 
        });

        const buttonEnter = new Button({ label:"Войти", type:"primary", onClick: onClickSendBind });
        const buttonRegistration = new Button({ label:"Регистрация", type:"secondary", onClick: onRegistrationBind });

        this.children = {
            ...this.children,
            inputLogin,
            inputPassword,
            buttonEnter,
            buttonRegistration
        }
    }

    onChangeLogin(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        if (this.isLoginError(inputValue)) return;
        (window as any).store.set({credentials: { login: inputValue, password: this.props.password }});
    }

    isLoginError(value: string): boolean {
        if(validation.login(value)) {
            this.children.inputLogin.children.validation_error?.setProps({ error_text: null });
            return false;
        } else {
            this.children.inputLogin.children.validation_error?.setProps({ error_text: 'Логин не соответствует требованиям' });
            return true;
        }
    }

    onChangePassword(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        if (this.isPasswordError(inputValue)) return;
        this.setProps({password: inputValue});
        (window as any).store.set({ credentials: { login: this.props.login , password: inputValue }});
    }

    isPasswordError(value: string):boolean {
        if(validation.password(value)) {
            if (this.props.error || this.props.error_text) {
                this.children.inputPassword?.children.validation_error?.setProps({ error_text: null });
            }
            return false;
        } else {
            this.children.inputPassword?.children.validation_error?.setProps({ error_text: 'Пароль не соответствует требованиям' });
            return true;
        }
    }

    onClickSend(event?: Event) {
        event?.preventDefault();
        let login_str = (document.getElementsByName('login')[0] as HTMLInputElement).value;
        let password_str = (document.getElementsByName('password')[0] as HTMLInputElement).value;

        let is_error = [
            this.isLoginError(login_str),
            this.isPasswordError(password_str),
        ]
        
        if (is_error.some(err => err === true)) return;
        
        login({ login: login_str, password: password_str });
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (!isEqual(oldProps, newProps)) {
            if (newProps.is_submit) {
                this.onClickSend();
            }
        }

        return true;
    }

    onRegistration() {
        (window as any).router.go('/sign-up');
    }

    render() {
        return `
            <div class="login_form">
                <div class="login_header">
                    <h2>Авторизация</h2>
                </div>
                <div class="login_input_container">
                    {{{ inputLogin }}}
                    {{{ inputPassword }}}
                </div>
                <div class="btn_container">
                    {{{ buttonEnter }}}
                    {{{ buttonRegistration }}}
                </div>
            </div>
        `;
    }
}

