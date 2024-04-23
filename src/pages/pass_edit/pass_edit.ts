import "./pass_edit.css";
import {Input, Button, ButtonNav} from "../../components"
import Block from "../../core/Block";
import * as validation from "../../utils/validation.ts";

export default class PassEditPage extends Block {
    [x: string]: any;
    
    init() {
        const on_change_password_bind = this.on_change_password.bind(this);

        const on_submit_bind = this.on_submit.bind(this);

        const button_back = new ButtonNav({ class: "button_back" });
        const oldPassword = new Input({ label:"Старый пароль", placeholder:"·······", class:"pass_edit_input", name:"oldPassword", type: "password", onBlur: on_change_password_bind });
        const newPassword = new Input({ label:"Новый пароль", placeholder:"·······", class:"pass_edit_input", name:"newPassword", type: "password", onBlur: on_change_password_bind });
        const repeatPassword = new Input({ label:"Повторите пароль", placeholder:"·······", class:"pass_edit_input", name:"repeatPassword", type: "password", onBlur: on_change_password_bind });
        const button_enter = new Button({ label:"Сохранить", type:"primary", onClick: on_submit_bind });
        const button_registration = new Button({ label:"Выйти", type:"secondary"});

        this.children = {
            ...this.children,
            button_back,
            oldPassword, 
            newPassword,
            repeatPassword,
            button_enter,
            button_registration
        }
    }

    on_change_password(event: any) {
        const input_value = event.target.value;
        const input_name = event.target.name;
        if (this.is_password_error(input_name, input_value)) return;
        this.setProps({[input_name]: input_value});
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

    on_submit() {
        if (this.is_password_error('oldPassword', this.props.oldPassword)
            || this.is_password_error('oldPassword', this.props.newPassword)
            || this.is_password_error('oldPassword', this.props.repeatPassword)) {

            return;

        }
        console.log({
            oldPassword: this.props.oldPassword,
            newPassword: this.props.newPassword,
            repeatPassword: this.props.repeatPassword,
        });
    }

    render(): string {
        return `
            <main class="pass_edit_container">
                {{{ button_back }}}
                <Form class="pass_edit_form">
                    <div class="pass_edit_input_container">
                        {{{ oldPassword }}}
                        {{{ newPassword }}}
                        {{{ repeatPassword }}}
                    </div>
                    <div class="pass_edit_btn_container">
                        {{{ button_enter }}}
                        {{{ button_registration }}}
                    </div>
                </Form>
            </main>
        `
    }
}




