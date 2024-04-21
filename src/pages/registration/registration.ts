import "./registration.css";
import { Input, Button } from "../../components";
import Block from "../../core/Block";

export default class RegistrationPage extends Block {
    constructor(props: any) {
        super({
            ...props,
            input_email: new Input({ placeholder:"Почта", class:"reg_form_input", name:"email" }),
            input_login: new Input({ placeholder:"Логин", class:"reg_form_input", name:"login" }),
            input_name: new Input({ placeholder:"Имя", class:"reg_form_input", name:"first_name" }),
            input_last_name: new Input({ placeholder:"Фамилия", class:"reg_form_input", name:"second_name" }),
            input_phone: new Input({ placeholder:"Телефон", class:"reg_form_input", name:"phone" }),
            input_password: new Input({ placeholder:"Пароль", class:"reg_form_input", name:"password", type: "password"}),
            input_repeat_password: new Input({ placeholder:"Повторите пароль", class:"reg_form_input", name:"password", type: "password"}),
            button_enter: new Button({ label:"Зарегистрироваться", type:"primary" }),
            button_registration: new Button({ label:"Войти", type:"secondary" }),
        })
    }

    render(): string {
        return `
            <main class="container">
                <Form class="reg_form">
                    <div class="reg_header">
                        <h2>Регистрация</h2>
                    </div>
                    <div class="input_container">
                        {{{ input_email }}}
                        {{{ input_login }}}
                        {{{ input_name }}}
                        {{{ input_last_name }}}
                        {{{ input_phone }}}
                        {{{ input_password }}}
                        {{{ input_repeat_password }}}
                    </div>
                    <div class="btn_container">
                        {{{ button_enter }}}
                        {{{ button_registration }}}
                    </div>
                </Form>
            </main>
        `
    }
}
