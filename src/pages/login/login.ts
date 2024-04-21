import { Input, Button } from "../../components";
import Block from "../../core/Block";

export default class LoginPage extends Block {
    init() {
        const on_change_login_bind = this.on_change_login.bind(this);
        const on_change_password_bind = this.on_change_password.bind(this);
        const on_login_bind = this.on_login.bind(this);

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

        const button_enter = new Button({ label:"Войти", type:"primary", onClick: on_login_bind });
        const button_registration = new Button({ label:"Регистрация", type:"secondary" });

        this.children = {
            ...this.children,
            input_login,
            input_password,
            button_enter,
            button_registration
        }
    }

    on_change_login(event) {
        const input_value = event.target.value;
        this.setProps({login: input_value});
    }

    on_change_password(event) {
        const input_value = event.target.value;
        this.setProps({password: input_value});
    }

    on_login() {
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