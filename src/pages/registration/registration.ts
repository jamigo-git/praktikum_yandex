import "./registration.css";
import { Input, Button } from "../../components";
import Block from "../../core/Block";

export default class RegistrationPage extends Block {
    init() {

        const on_change_first_name_bind = this.on_change_first_name.bind(this);
        const on_change_second_name_bind = this.on_change_second_name.bind(this);
        const on_change_login_bind = this.on_change_login.bind(this);
        const on_change_email_bind = this.on_change_email.bind(this);
        const on_change_phone_bind = this.on_change_phone.bind(this);
        const on_change_password_bind = this.on_change_password.bind(this);
        const on_change_repeat_password_bind = this.on_change_repeat_password.bind(this);

        const on_registration_bind = this.on_registration.bind(this);
        
        const input_email = new Input({ placeholder:"Почта", class:"reg_form_input", name:"email", onBlur: on_change_email_bind });
        const input_login = new Input({ placeholder:"Логин", class:"reg_form_input", name:"login", onBlur: on_change_login_bind });
        const input_name = new Input({ placeholder:"Имя", class:"reg_form_input", name:"first_name", onBlur: on_change_first_name_bind });
        const input_last_name = new Input({ placeholder:"Фамилия", class:"reg_form_input", name:"second_name", onBlur: on_change_second_name_bind });
        const input_phone = new Input({ placeholder:"Телефон", class:"reg_form_input", name:"phone", onBlur: on_change_phone_bind });
        const input_password = new Input({ placeholder:"Пароль", class:"reg_form_input", name:"password", type: "password", onBlur: on_change_password_bind });
        const input_repeat_password = new Input({ placeholder:"Повторите пароль", class:"reg_form_input", name:"password", type: "password", onBlur: on_change_repeat_password_bind });
        const button_enter = new Button({ label:"Зарегистрироваться", type:"primary", onClick: on_registration_bind });
        const button_registration = new Button({ label:"Войти", type:"secondary" });

        this.children = {
            ...this.children,
            input_email,
            input_login,
            input_name,
            input_last_name,
            input_phone,
            input_password,
            input_repeat_password,
            button_enter,
            button_registration
        }
    }

    on_change_first_name(event) {
        const input_value = event.target.value;
        this.setProps({first_name: input_value});
    }

    on_change_second_name(event) {
        const input_value = event.target.value;
        this.setProps({second_name: input_value});
    }

    on_change_login(event) {
        const input_value = event.target.value;
        this.setProps({login: input_value});
    }
    
    on_change_email(event) {
        const input_value = event.target.value;
        this.setProps({email: input_value});
    }

    on_change_phone(event) {
        const input_value = event.target.value;
        this.setProps({phone: input_value});
    }

    on_change_password(event) {
        const input_value = event.target.value;
        this.setProps({newPassword: input_value});
    }

    on_change_repeat_password(event) {
        const input_value = event.target.value;
        this.setProps({repeatPassword: input_value});
    }

    on_registration() {
        console.log({
            first_name: this.props.first_name,
            second_name: this.props.second_name,
            login: this.props.login,
            email: this.props.email,
            phone: this.props.phone,
            newPassword: this.props.newPassword,
            repeatPassword: this.props.repeatPassword,
        });
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
