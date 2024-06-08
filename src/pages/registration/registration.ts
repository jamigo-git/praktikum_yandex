import "./registration.css";
import { Input, Button } from "../../components";
import Block from "../../core/Block";
import * as validation from "../../utils/validation.ts";
import { connect } from "../../utils/connect.ts";
import { registration } from "../../services/auth.ts";

class RegistrationPage extends Block {
    init() {
        const onChangeFirstNameBind = this.onChangeFirstName.bind(this);
        const onChangeSecondNameBind = this.onChangeSecondName.bind(this);
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onChangeEmailBind = this.onChangeEmail.bind(this);
        const onChangePhoneBind = this.onChangePhone.bind(this);
        const onChangePasswordBind = this.onChangePassword.bind(this);
        const onChangeRepeatPassword_bind = this.onChangeRepeatPassword.bind(this);
        const onBackClickBind = this.onBackClick.bind(this);

        const onRegistrationBind = this.onRegistration.bind(this);
        
        const inputName = new Input({ placeholder:"Имя", class:"reg_form_input", name:"first_name", onBlur: onChangeFirstNameBind });
        const inputLastName = new Input({ placeholder:"Фамилия", class:"reg_form_input", name:"second_name", onBlur: onChangeSecondNameBind });
        const inputLogin = new Input({ placeholder:"Логин", class:"reg_form_input", name:"login", onBlur: onChangeLoginBind });
        const inputEmail = new Input({ placeholder:"Почта", class:"reg_form_input", name:"email", onBlur: onChangeEmailBind });
        const inputPhone = new Input({ placeholder:"Телефон", class:"reg_form_input", name:"phone", onBlur: onChangePhoneBind });
        const inputPassword = new Input({ placeholder:"Пароль", class:"reg_form_input", name:"password", type: "password", onBlur: onChangePasswordBind });
        const inputRepeatPassword = new Input({ placeholder:"Повторите пароль", class:"reg_form_input", name:"repeatPassword", type: "password", onBlur: onChangeRepeatPassword_bind });
        const buttonEnter = new Button({ label:"Зарегистрироваться", type:"primary", onClick: onRegistrationBind });
        const buttonRegistration = new Button({ label:"Назад", type:"secondary", onClick: onBackClickBind });

        this.children = {
            ...this.children,
            inputEmail,
            inputLogin,
            inputName,
            inputLastName,
            inputPhone,
            inputPassword,
            inputRepeatPassword,
            buttonEnter,
            buttonRegistration
        }
    }

    onChangeFirstName(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        if (this.isFirstNameError(inputValue)) return;
        this.setProps({first_name: inputValue});
    }

    isFirstNameError(value: string): boolean {
        if(validation.name(value)) {
            this.children.inputName.children.validation_error?.setProps({ error_text: null });
            return false;
        } else {
            this.children.inputName.children.validation_error?.setProps({ error_text: 'Имя не соответствует требованиям'});
            return true;
        }
    }

    onChangeSecondName(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        if (this.isSecondNameError(inputValue)) return
        this.setProps({second_name: inputValue});
    }

    isSecondNameError(value: string): boolean {
        if(validation.name(value)) {
            this.children.inputLastName.children.validation_error?.setProps({ error_text: null});
            return false;
        } else {
            this.children.inputLastName.children.validation_error?.setProps({ error_text: 'Фамилия не соответствует требованиям'});
            return true;
        }
    }

    onChangeLogin(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        if (this.isLoginError(inputValue)) return;
        this.setProps({login: inputValue});
    }

    isLoginError(value: string): boolean {
        if(validation.login(value)) {
            this.children.inputLogin.children.validation_error?.setProps({ error_text: null });
            return false;
        } else {
            this.children.inputLogin.children.validation_error?.setProps({ error_text: 'Логин не соответствует требованиям' });
            return true;
        }
    }
    
    onChangeEmail(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        if (this.isEmailError(inputValue)) return;
        this.setProps({email: inputValue});
    }

    isEmailError(value: string): boolean {
        if(validation.email(value)) {
            this.children.inputEmail.children.validation_error?.setProps({ error_text: null });
            return false;
        } else {
            this.children.inputEmail.children.validation_error?.setProps({ error_text: 'Email не соответствует требованиям' });
            return true;
        }
    }

    onChangePhone(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        if (this.isPhoneError(inputValue)) return;
        this.setProps({phone: inputValue});
    }

    isPhoneError(value: string): boolean {
        if(validation.phone(value)) {
            this.children.inputPhone.children.validation_error?.setProps({ error_text: null });
            return false;
        } else {
            this.children.inputPhone.children.validation_error?.setProps({ error_text: 'Телефон не соответствует требованиям' });
            return true;
        }
    }

    onChangePassword(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        if (this.isPasswordError(inputValue)) return;
        this.setProps({newPassword: inputValue});
    }

    isPasswordError(value: string): boolean {
        if(validation.password(value)) {
            this.children.inputPassword.children.validation_error?.setProps({ error_text: null });
            return false;
        } else {
            this.children.inputPassword.children.validation_error?.setProps({ error_text: 'Пароль не соответствует требованиям' });
            return true;
        }
    }

    onChangeRepeatPassword(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        if (this.isRepeatPasswordError(inputValue)) return;
        this.setProps({repeatPassword: inputValue});
    }

    isRepeatPasswordError(value: string): boolean {
        if(validation.password(value)) {
            this.children.inputRepeatPassword.children.validation_error?.setProps({ error_text: null });
            return false;
        } else {
            this.children.inputRepeatPassword.children.validation_error?.setProps({ error_text: 'Пароль не соответствует требованиям' });
            return true;
        }
    }

    onRegistration(event: Event) {
        event.preventDefault();
        const result = 
            [
                this.isFirstNameError((document.getElementsByName('first_name')[0] as HTMLInputElement)?.value),
                this.isSecondNameError((document.getElementsByName('second_name')[0] as HTMLInputElement)?.value),
                this.isLoginError((document.getElementsByName('login')[0] as HTMLInputElement)?.value),
                this.isEmailError((document.getElementsByName('email')[0] as HTMLInputElement)?.value),
                this.isPhoneError((document.getElementsByName('phone')[0] as HTMLInputElement)?.value),
                this.isPasswordError((document.getElementsByName('password')[0] as HTMLInputElement)?.value),
                this.isRepeatPasswordError((document.getElementsByName('repeatPassword')[0] as HTMLInputElement)?.value),
            ];
        if (result.some(res => res === true)) return;

        registration({
            first_name: this.props.first_name,
            second_name: this.props.second_name,
            login: this.props.login,
            email: this.props.email,
            phone: this.props.phone,
            password: this.props.newPassword,
        });
    }

    onBackClick() {
        window.router.go('/login');
    }

    render(): string {
        return `
            <main class="container">
                {{#if isLoading}}
                    <h2>SPINNER</h2>
                {{else}}
                    <Form class="reg_form">
                        <div class="reg_header">
                            <h2>Регистрация</h2>
                        </div>
                        <div class="reg_form_input_container">
                            {{{ inputEmail }}}
                            {{{ inputLogin }}}
                            {{{ inputName }}}
                            {{{ inputLastName }}}
                            {{{ inputPhone }}}
                            {{{ inputPassword }}}
                            {{{ inputRepeatPassword }}}
                        </div>
                        <div class="btn_container">
                            {{{ buttonEnter }}}
                            {{{ buttonRegistration }}}
                        </div>
                    </Form>
                    {{#if registrationError}}
                        <div class="api_error"> {{ registrationError }} <div>
                    {{/if}}
                {{/if}}
            </main>
        `
    }
}

const mapStateToProps = (store: any) => {
    return {
        registrationError: store.registrationError,
        isLoading: store.isLoading
    }
}

export default connect(mapStateToProps)(RegistrationPage);
