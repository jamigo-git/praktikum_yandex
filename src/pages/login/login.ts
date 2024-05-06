import { Input, Button } from "../../components";
import Block from "../../core/Block";
import * as validation from "../../utils/validation.ts";
import { connect } from "../../utils/connect";
import { login } from "../../services/auth";
class LoginPage extends Block {
    init() {
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onChangePassword_bind = this.onChangePassword.bind(this);
        const onSubmitBind = this.onSubmit.bind(this);
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

        const buttonEnter = new Button({ label:"Войти", type:"primary", onClick: onSubmitBind });
        const buttonRegistration = new Button({ label:"Регистрация", type:"secondary", onClick: onRegistrationBind });

        this.children = {
            ...this.children,
            inputLogin,
            inputPassword,
            buttonEnter,
            buttonRegistration
        }
    }

    onChangeLogin(event: any) {
        console.log(event)
        const inputValue = event.target.value;
        if (this.isLoginError(inputValue)) return;
        this.setProps({login: inputValue});
    }

    isLoginError(value: string): boolean {
        if(validation.login(value)) {
            this.children.inputLogin.setProps({error: false, error_text: null});
            return false;
        } else {
            this.children.inputLogin.setProps({error: true, error_text: 'Логин не соответствует требованиям'});
            return true;
        }
    }

    onChangePassword(event: any) {
        const inputValue = event.target.value;
        if (this.isPasswordError(inputValue)) return;
        this.setProps({password: inputValue});
    }

    isPasswordError(value: string):boolean {
        if(validation.password(value)) {
            this.children.inputPassword.setProps({error: false, error_text: null});
            return false;
        } else {
            this.children.inputPassword.setProps({error: true, error_text: 'Пароль не соответствует требованиям'});
            return true;
        }
    }

    onSubmit(event: any) {
        if (this.isPasswordError(this.props.password) || this.isLoginError(this.props.login)) return;
        
        console.log({
            login: this.props.login,
            password: this.props.password
        });

        event.preventDefault();
        login({login: this.props.login, password: this.props.password});

    }

    onRegistration() {
        (window as any).router.go('/sign-up');
    }

    render() {
        return `
            <div class="container">
                <main class="container">
                    {{#if isLoading}}
                        <h2>SPINER</h2>
                    {{else}}
                        <Form class="login_form">
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
                        </Form>
                        {{#if loginError}}
                            <div class="api_error"> {{loginError}} <div>
                        {{/if}}
                    {{/if}}
                </main>
            </div>
        `
    }
}

const mapStateToProps = (store: any) => {
    return {
        loginError: store.loginError,
        isLoading: store.isLoading
    }
}

export default connect(mapStateToProps)(LoginPage);