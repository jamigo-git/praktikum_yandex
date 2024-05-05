import "./profile.css";
import { FormString, Button, Avatar, ButtonNav } from "../../components";
import Block from "../../core/Block";
import type { Props } from "../../core/Block";

export default class ProfilePage extends Block {

    constructor(props: Props) {
        super({
            ...props,
        })
    }

    init() {
        const onBackClickBind = this.onBackClick.bind(this);

        const buttonBack = new ButtonNav({ class: "button_back", onBackClickBind });
        const avatar = new Avatar({ label:"jamigo", class:"avatar_profile" });
        const formStrName = new FormString({ label:"Имя", value:"Игорь" });
        const formStrLastName = new FormString({ label:"Фамилия", value:"Ямалеев" });
        const formStrLogin = new FormString({ label:"Логин", value:"jamigo" });
        const formStrEmail = new FormString({ label:"Почта", value:"jamigo@ya.ru" });
        const formStrPhone = new FormString({ label:"Телефон", value:"+7 (917) 207 90 22" });
        const buttonEditData = new Button({ label:"Изменить данные", type:"secondary" });
        const buttonEditPassword = new Button({ label:"Изменить пароль", type:"secondary" });
        const buttonExit = new Button({ label:"Выйти", type:"secondary" });

        this.children = {
            ...this.children,
            buttonBack,
            avatar,
            formStrName,
            formStrLastName,
            formStrLogin,
            formStrEmail,
            formStrPhone,
            buttonEditData,
            buttonEditPassword,
            buttonExit,
        }
    }

    onBackClick() {
        (window as any).router.back();
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
