import "./profile_edit.css";
import { Input, Button, Avatar, ButtonNav } from "../../components";
import Block from "../../core/Block";

export default class ProfilePageEdit extends Block {
    constructor(props: any) {
        super({
            ...props,
            button_back: new ButtonNav({ class: "button_back" }),
            avatar: new Avatar({ label:"jamigo", class:"avatar_profile" }),
            input_name: new Input({ label:"Имя", placeholder:"Игорь", class:"profile_edit_input", name:"first_name" }),
            input_second_name: new Input({ label:"Фамилия", placeholder:"Ямалеев", class:"profile_edit_input", name:"second_name" }),
            input_login: new Input({ label:"Логин", placeholder:"jamigo", class:"profile_edit_input", name:"login" }),
            input_email: new Input({ label:"Почта", placeholder:"jamigo@ya.ru", class:"profile_edit_input", name:"email" }),
            input_phone: new Input({ label: "Телефон", placeholder:"+7 (917) 207 90 22", class:"profile_edit_input", name:"phone" }),
            button_save: new Button({ label:"Сохранить", type:"primary" }),
            button_exit: new Button({ label:"Выйти", type:"secondary" }),
        })
    }
    render(): string {
        return `
            <main class="profile_edit_container">
                {{{ button_back }}}
                <Form class="profile_edit_form">
                    {{{ avatar }}}
                    <div class="profile_edit_input_container">
                        {{{ input_name }}}
                        {{{ input_second_name }}}
                        {{{ input_login }}}
                        {{{ input_email }}}
                        {{{ input_phone }}}
                    </div>
                    <div class="profile_edit_btn_container">
                        {{{ button_save }}}
                        {{{ button_exit }}}
                    </div>
                </Form>
            </main>
        `
    }
}

