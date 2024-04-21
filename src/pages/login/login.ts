import { Input, Button } from "../../components";
import Block from "../../core/Block";

export default class LoginPage extends Block {
    constructor(props: any) {

        super({
            ...props,
            input_login: new Input({ placeholder:"Логин", class:"login_form_input", name:"login" }),
            input_password: new Input({ placeholder:"Пароль", class:"login_form_input", name:"password", type: "password"}),
            button_enter: new Button({ label:"Войти", type:"primary" }),
            button_registration: new Button({ label:"Регистрация", type:"secondary" }),
        })
    }

    render() {
        return `
            <div class="container">
                <main class="container">
                    <Form class="login_form">
                        <div class="login_header">
                            <h2>Авторизация</h2>
                        </div>
                        <div class="input_container">
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