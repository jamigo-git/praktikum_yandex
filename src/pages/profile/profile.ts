import "./profile.css";
import { FormString, Button, Avatar, ButtonNav } from "../../components";
import Block from "../../core/Block";
import type { Props } from "../../core/Block";

export default class ProfilePage extends Block {
    constructor(props: Props) {
        super({
            ...props,
            buttonBack: new ButtonNav({ class: "button_back" }),
            avatar: new Avatar({ label:"jamigo", class:"avatar_profile" }),
            formStrName: new FormString({ label:"Имя", value:"Игорь" }),
            formStrLastName: new FormString({ label:"Фамилия", value:"Ямалеев" }),
            formStrLogin: new FormString({ label:"Логин", value:"jamigo" }),
            formStrEmail: new FormString({ label:"Почта", value:"jamigo@ya.ru" }),
            formStrPhone: new FormString({ label:"Телефон", value:"+7 (917) 207 90 22" }),
            buttonEditData: new Button({ label:"Изменить данные", type:"secondary" }),
            buttonEditPassword: new Button({ label:"Изменить пароль", type:"secondary" }),
            buttonExit: new Button({ label:"Выйти", type:"secondary" }),
        })
    }

    render(): string {
        return `
            <main class="container">
                {{{ buttonBack }}}
                <Form class="profile_form">
                    {{{ avatar }}}
                    <div class="fields_container">
                        {{{ formStrName }}}
                        {{{ formStrLastName }}}
                        {{{ formStrLogin }}}
                        {{{ formStrEmail }}}
                        {{{ formStrPhone }}}
                    </div>
                    <div class="btn_container">
                        {{{ buttonEditData }}}
                        {{{ buttonEditPassword }}}
                        {{{ buttonExit }}}
                    </div>
                </Form>
            </main>       
        `;
    }
}
