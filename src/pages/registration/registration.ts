import "./registration.css";
import { Input, Button } from "../../components";
import Block from "../../core/Block";
import * as validation from "../../utils/validation.ts";

export default class RegistrationPage extends Block {
    [x: string]: any;
    init() {
        const on_change_first_name_bind = this.on_change_first_name.bind(this);
        const on_change_second_name_bind = this.on_change_second_name.bind(this);
        const on_change_login_bind = this.on_change_login.bind(this);
        const on_change_email_bind = this.on_change_email.bind(this);
        const on_change_phone_bind = this.on_change_phone.bind(this);
        const on_change_password_bind = this.on_change_password.bind(this);
        const on_change_repeat_password_bind = this.on_change_repeat_password.bind(this);

        const on_registration_bind = this.on_registration.bind(this);
        
        const input_name = new Input({ placeholder:"Имя", class:"reg_form_input", name:"first_name", onBlur: on_change_first_name_bind });
        const input_last_name = new Input({ placeholder:"Фамилия", class:"reg_form_input", name:"second_name", onBlur: on_change_second_name_bind });
        const input_login = new Input({ placeholder:"Логин", class:"reg_form_input", name:"login", onBlur: on_change_login_bind });
        const input_email = new Input({ placeholder:"Почта", class:"reg_form_input", name:"email", onBlur: on_change_email_bind });
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

    on_change_first_name(event: any) {
        const input_value = event.target.value;
        if (this.is_first_name_error(input_value)) return;
        this.setProps({first_name: input_value});
    }

    is_first_name_error(value: string): boolean {
        if(validation.name(value)) {
            this.children.input_name.setProps({error: false, error_text: null});
            return false;
        } else {
            this.children.input_name.setProps({error: true, error_text: 'Имя не соответствует требованиям'});
            return true;
        }
    }

    on_change_second_name(event: any) {
        const input_value = event.target.value;
        if (this.is_second_name_error(input_value)) return
        this.setProps({second_name: input_value});
    }

    is_second_name_error(value: string): boolean {
        if(validation.name(value)) {
            this.children.input_last_name.setProps({error: false, error_text: null});
            return false;
        } else {
            this.children.input_last_name.setProps({error: true, error_text: 'Фамилия не соответствует требованиям'});
            return true;
        }
    }

    on_change_login(event: any) {
        const input_value = event.target.value;
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
    
    on_change_email(event: any) {
        const input_value = event.target.value;
        if (this.is_email_error(input_value)) return;
        this.setProps({email: input_value});
    }

    is_email_error(value: string): boolean {
        if(validation.email(value)) {;
            this.children.input_email.setProps({error: false, error_text: null});
            return false;
        } else {
            this.children.input_email.setProps({error: true, error_text: 'Email не соответствует требованиям'});
            return true;
        }
    }

    on_change_phone(event: any) {
        const input_value = event.target.value;
        if (this.is_phone_error(input_value)) return;
        this.setProps({phone: input_value});
    }

    is_phone_error(value: string): boolean {
        if(validation.phone(value)) {
            this.children.input_phone.setProps({error: false, error_text: null});
            return false;
        } else {
            this.children.input_phone.setProps({error: true, error_text: 'Телефон не соответствует требованиям'});
            return true;
        }
    }

    on_change_password(event: any) {
        const input_value = event.target.value;
        if (this.is_password_error(input_value)) return;
        this.setProps({newPassword: input_value});
    }

    is_password_error(value: string): boolean {
        if(validation.password(value)) {
            this.children.input_password.setProps({error: false, error_text: null});
            return false;
        } else {
            this.children.input_password.setProps({error: true, error_text: 'Пароль не соответствует требованиям'});
            return true;
        }
    }

    on_change_repeat_password(event: any) {
        const input_value = event.target.value;
        if (this.is_repeat_password_error(input_value)) return;
        this.setProps({repeatPassword: input_value});
    }

    is_repeat_password_error(value: string): boolean {
        if(validation.password(value)) {
            this.children.input_repeat_password.setProps({error: false, error_text: null});
            return false;
        } else {
            this.children.input_repeat_password.setProps({error: true, error_text: 'Пароль не соответствует требованиям'});
            return true;
        }
    }

    on_registration() {
        if (this.is_first_name_error(this.props.first_name)
            || this.is_second_name_error(this.props.second_name)
            || this.is_login_error(this.props.login)
            || this.is_password_error(this.props.newPassword)
            || this.is_repeat_password_error(this.props.repeatPassword)
            || this.is_phone_error(this.props.phone)
            || this.is_email_error(this.props.email)) {

            return;
        }
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
                    <div class="reg_form_input_container">
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
