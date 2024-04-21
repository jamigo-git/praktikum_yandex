import "./pass_edit.css";
import {Input, Button, ButtonNav} from "../../components"
import Block from "../../core/Block";

export default class PassEditPage extends Block {
    constructor(props: any) {
        super({
            ...props,
            button_back: new ButtonNav({ class: "button_back" }),
            old_password: new Input({ label:"Старый пароль", placeholder:"·······", class:"pass_edit_input", name:"oldPassword", type: "password" }),
            new_password: new Input({ label:"Новый пароль", placeholder:"·······", class:"pass_edit_input", name:"newPassword", type: "password"}),
            repeat_password: new Input({ label:"Повторите пароль", placeholder:"·······", class:"pass_edit_input", name:"newPassword", type: "password"}),
            button_enter: new Button({ label:"Сохранить", type:"primary" }),
            button_registration: new Button({ label:"Выйти", type:"secondary" }),
        })
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




