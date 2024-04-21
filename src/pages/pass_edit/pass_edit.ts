import "./pass_edit.css";
import {Input, Button, ButtonNav} from "../../components"
import Block from "../../core/Block";

export default class PassEditPage extends Block {
    init() {
        const on_change_old_password_bind = this.on_change_old_password.bind(this);
        const on_change_new_password_bind = this.on_change_new_password.bind(this);
        const on_change_repeat_password_bind = this.on_change_repeat_password.bind(this);

        const on_save_bind = this.on_save.bind(this);

        const button_back = new ButtonNav({ class: "button_back" });
        const old_password = new Input({ label:"Старый пароль", placeholder:"·······", class:"pass_edit_input", name:"oldPassword", type: "password", onBlur: on_change_old_password_bind });
        const new_password = new Input({ label:"Новый пароль", placeholder:"·······", class:"pass_edit_input", name:"newPassword", type: "password", onBlur: on_change_new_password_bind });
        const repeat_password = new Input({ label:"Повторите пароль", placeholder:"·······", class:"pass_edit_input", name:"repeatPassword", type: "password", onBlur: on_change_repeat_password_bind });
        const button_enter = new Button({ label:"Сохранить", type:"primary", onClick: on_save_bind });
        const button_registration = new Button({ label:"Выйти", type:"secondary"});

        this.children = {
            ...this.children,
            button_back,
            old_password, 
            new_password,
            repeat_password,
            button_enter,
            button_registration
        }
    }

    on_change_old_password(event) {
        const input_value = event.target.value;
        this.setProps({oldPassword: input_value});
    }

    on_change_new_password(event) {
        const input_value = event.target.value;
        this.setProps({newPassword: input_value});
    }

    on_change_repeat_password(event) {
        const input_value = event.target.value;
        this.setProps({repeatPassword: input_value});
    }

    on_save() {
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
                        {{{ old_password }}}
                        {{{ new_password }}}
                        {{{ repeat_password }}}
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




