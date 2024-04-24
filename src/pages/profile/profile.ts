import "./profile.css";
import { FormString, Button, Avatar, ButtonNav } from "../../components";
import Block from "../../core/Block";
import type { Props } from "../../core/Block";

export default class ProfilePage extends Block {
    constructor(props: Props) {
        super({
            ...props,
            button_back: new ButtonNav({ class: "button_back" }),
            avatar: new Avatar({ label:"jamigo", class:"avatar_profile" }),
            form_str_name: new FormString({ label:"Имя", value:"Игорь" }),
            form_str_last_name: new FormString({ label:"Фамилия", value:"Ямалеев" }),
            form_str_login: new FormString({ label:"Логин", value:"jamigo" }),
            form_str_email: new FormString({ label:"Почта", value:"jamigo@ya.ru" }),
            form_str_phone: new FormString({ label:"Телефон", value:"+7 (917) 207 90 22" }),
            button_edit_data: new Button({ label:"Изменить данные", type:"secondary" }),
            button_edit_password: new Button({ label:"Изменить пароль", type:"secondary" }),
            button_exit: new Button({ label:"Выйти", type:"secondary" }),
        })
    }

    render(): string {
        return `
            <main class="container">
                {{{ button_back }}}
                <Form class="profile_form">
                    {{{ avatar }}}
                    <div class="fields_container">
                        {{{ form_str_name }}}
                        {{{ form_str_last_name }}}
                        {{{ form_str_login }}}
                        {{{ form_str_email }}}
                        {{{ form_str_phone }}}
                    </div>
                    <div class="btn_container">
                        {{{ button_edit_data }}}
                        {{{ button_edit_password }}}
                        {{{ button_exit }}}
                    </div>
                </Form>
            </main>       
        `;
    }
}
