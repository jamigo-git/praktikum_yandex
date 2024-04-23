import { Input, Button } from "../../components";
import Block from "../../core/Block";
import * as validation from "../../utils/validation.ts";

export default class LoginPage extends Block {
    [x: string]: any;

    init() {
        const on_change_login_bind = this.on_change_login.bind(this);
        const on_change_password_bind = this.on_change_password.bind(this);
        const on_submit_bind = this.on_submit.bind(this);

        const input_login = new Input({ 
            placeholder: "Логин", 
            class: "login_form_input", 
            name: "login",
            onBlur: on_change_login_bind,
        });

        const input_password = new Input({ 
            placeholder: "Пароль", 
            class: "login_form_input", 
            name: "password", 
            type: "password", 
            onBlur: on_change_password_bind, 
        });

        const button_enter = new Button({ label:"Войти", type:"primary", onClick: on_submit_bind });
        const button_registration = new Button({ label:"Регистрация", type:"secondary" });

        this.children = {
            ...this.children,
            input_login,
            input_password,
            button_enter,
            button_registration
        }
    }

    on_change_login(event: any) {
        console.log(event)
        const input_value = event.target?.value;
        if (this.is_login_error(input_value)) return;
        this.setProps({login: input_value});
    }

    is_login_error(value: string): boolean {
        if(validation.login(value)) {
            this.children.input_login.setProps({error: false, error_text: null});
            return false;
        } else {
            this.children.input_login.setProps({error: true, error_text: 'Логин не соответствует требованиям'});
            return true;
        }
    }

    on_change_password(event: any) {
        const input_value = event.target.value;
        if (this.is_password_error(input_value)) return;
        this.setProps({password: input_value});
    }

    is_password_error(value: string):boolean {
        if(validation.password(value)) {
            this.children.input_password.setProps({error: false, error_text: null});
            return false;
        } else {
            this.children.input_password.setProps({error: true, error_text: 'Пароль не соответствует требованиям'});
            return true;
        }
    }

    on_submit() {
        if (this.is_password_error(this.props.password) || this.is_login_error(this.props.login)) return;
        console.log({
            login: this.props.login,
            password: this.props.password
        });
    }

    render() {
        return `
            <div class="container">
                <main class="container">
                    <Form class="login_form">
                        <div class="login_header">
                            <h2>Авторизация</h2>
                        </div>
                        <div class="login_input_container">
                            {{{ input_login }}}
                            {{{ input_password }}}
                        </div>
                        <div class="btn_container">
                            {{{ button_enter }}}
                            {{{ button_registration }}}
                        </div>
                    </Form>
                </main>
            </div>
        `
    }
}