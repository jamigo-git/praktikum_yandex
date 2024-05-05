import "./profile_edit.css";
import { Input, Button, Avatar, ButtonNav } from "../../components";
import Block from "../../core/Block";
import * as validation from "../../utils/validation.ts";
import type { Props } from "../../core/Block";

export default class ProfilePageEdit extends Block {

    constructor(props: Props) {
        super({
            ...props,
        })
    }

    init() {
        const onChangeFirstNameBind = this.onChangeFirstName.bind(this);
        const onChangeSecondNameBind = this.onChangeSecondName.bind(this);
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onChangeEmailBind = this.onChangeEmail.bind(this);
        const onChangePhoneBind = this.onChangePhone.bind(this);

        const onSaveBind = this.onSave.bind(this);

        const buttonBack = new ButtonNav({ class: "button_back" });
        const avatar = new Avatar({ label:"jamigo", class:"avatar_profile" });
        const inputName = new Input({ label:"Имя", placeholder:"Игорь", class:"profile_edit_input", name:"first_name", onBlur: onChangeFirstNameBind});
        const inputSecondName = new Input({ label:"Фамилия", placeholder:"Ямалеев", class:"profile_edit_input", name:"second_name", onBlur: onChangeSecondNameBind  });
        const inputLogin = new Input({ label:"Логин", placeholder:"jamigo", class:"profile_edit_input", name:"login", onBlur: onChangeLoginBind });
        const inputEmail = new Input({ label:"Почта", placeholder:"jamigo@ya.ru", class:"profile_edit_input", name:"email", onBlur: onChangeEmailBind });
        const inputPhone = new Input({ label: "Телефон", placeholder:"+7 (917) 207 90 22", class:"profile_edit_input", name:"phone", onBlur: onChangePhoneBind });
        const buttonSave = new Button({ label:"Сохранить", type:"primary", onClick: onSaveBind });
        const buttonExit = new Button({ label:"Выйти", type:"secondary" });

        this.children = {
            ...this.children,
            buttonBack,
            avatar,
            inputName,
            inputSecondName,
            inputLogin,
            inputEmail,
            inputPhone,
            buttonSave,
            buttonExit,
        }
    }

    onChangeFirstName(event: any) {
        const inputValue = event.target.value;
        if (this.isFirstNameError(inputValue)) return;
        this.setProps({first_name: inputValue});
    }

    isFirstNameError(value: string): boolean {
        if(validation.name(value)) {
            this.children.inputName.setProps({error: false, error_text: null});
            return false;
        } else {
            this.children.inputName.setProps({error: true, error_text: 'Имя не соответствует требованиям'});
            return true;
        }
    }

    onChangeSecondName(event: any) {
        const inputValue = event.target.value;
        if (this.isSecondNameError(inputValue)) return;
        this.setProps({second_name: inputValue});
    }

    isSecondNameError(value: string): boolean {
        if(validation.name(value)) {
            this.children.inputSecondName.setProps({error: false, error_text: null});
            return false;
        } else {
            this.children.inputSecondName.setProps({error: true, error_text: 'Фамилия не соответствует требованиям'});
            return true;
        }
    }

    onChangeLogin(event: any) {
        const inputValue = event.target.value;
        if (this.isLoginError(inputValue)) return;
        this.setProps({login: inputValue});
    }

    isLoginError(value: string): boolean {
        if(validation.login(value)) {
            this.children.inputLogin.setProps({error: false, error_text: null});
            return false;
        } else {
            this.children.inputLogin.setProps({error: true, error_text: 'Логин не соответствует требованиям'});
            return true;
        }
    }
    
    onChangeEmail(event: any) {
        const inputValue = event.target.value;
        if (this.isEmailError(inputValue)) return;
        this.setProps({email: inputValue});
    }

    isEmailError(value: string): boolean {
        if(validation.email(value)) {
            this.children.inputEmail.setProps({error: false, error_text: null});
            return false;
        } else {
            this.children.inputEmail.setProps({error: true, error_text: 'Email не соответствует требованиям'});
            return true;
        }
    }

    onChangePhone(event: any) {
        const inputValue = event.target.value;
        if (this.isPhoneError(inputValue)) return;
        this.setProps({phone: inputValue});
    }

    isPhoneError(value: string): boolean {
        if(validation.phone(value)) {
            this.children.inputPhone.setProps({error: false, error_text: null});
            return false;
        } else {
            this.children.inputPhone.setProps({error: true, error_text: 'Телефон не соответствует требованиям'});
            return true;
        }
    }

    onSave() {
        if (this.isFirstNameError(this.props.first_name)
            || this.isSecondNameError(this.props.second_name)
            || this.isLoginError(this.props.login)
            || this.isEmailError(this.props.email)
            || this.isPhoneError(this.props.phone)) {
            
            return;
        }

        console.log({
            first_name: this.props.first_name,
            second_name: this.props.second_name,
            login: this.props.login,
            email: this.props.email,
            phone: this.props.phone,
        });
    }

    render(): string {
        return `
            <main class="profile_edit_container">
                {{{ buttonBack }}}
                <Form class="profile_edit_form">
                    {{{ avatar }}}
                    <div class="profile_edit_input_container">
                        {{{ inputName }}}
                        {{{ inputSecondName }}}
                        {{{ inputLogin }}}
                        {{{ inputEmail }}}
                        {{{ inputPhone }}}
                    </div>
                    <div class="profile_edit_btn_container">
                        {{{ buttonSave }}}
                        {{{ buttonExit }}}
                    </div>
                </Form>
            </main>
        `
    }
}
