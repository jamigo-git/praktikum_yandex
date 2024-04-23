import "./profile_edit.css";
import { Input, Button, Avatar, ButtonNav } from "../../components";
import Block from "../../core/Block";
import * as validation from "../../utils/validation.ts";

export default class ProfilePageEdit extends Block {
    props: any;
    children: any;

    constructor(props: any) {
        super({
            ...props,
        })
    }

    init() {
        const on_change_first_name_bind = this.on_change_first_name.bind(this);
        const on_change_second_name_bind = this.on_change_second_name.bind(this);
        const on_change_login_bind = this.on_change_login.bind(this);
        const on_change_email_bind = this.on_change_email.bind(this);
        const on_change_phone_bind = this.on_change_phone.bind(this);

        const on_save_bind = this.on_save.bind(this);

        const button_back = new ButtonNav({ class: "button_back" });
        const avatar = new Avatar({ label:"jamigo", class:"avatar_profile" });
        const input_name = new Input({ label:"Имя", placeholder:"Игорь", class:"profile_edit_input", name:"first_name", onBlur: on_change_first_name_bind});
        const input_second_name = new Input({ label:"Фамилия", placeholder:"Ямалеев", class:"profile_edit_input", name:"second_name", onBlur: on_change_second_name_bind  });
        const input_login = new Input({ label:"Логин", placeholder:"jamigo", class:"profile_edit_input", name:"login", onBlur: on_change_login_bind });
        const input_email = new Input({ label:"Почта", placeholder:"jamigo@ya.ru", class:"profile_edit_input", name:"email", onBlur: on_change_email_bind });
        const input_phone = new Input({ label: "Телефон", placeholder:"+7 (917) 207 90 22", class:"profile_edit_input", name:"phone", onBlur: on_change_phone_bind });
        const button_save = new Button({ label:"Сохранить", type:"primary", onClick: on_save_bind });
        const button_exit = new Button({ label:"Выйти", type:"secondary" });

        this.children = {
            ...this.children,
            button_back,
            avatar,
            input_name,
            input_second_name,
            input_login,
            input_email,
            input_phone,
            button_save,
            button_exit,
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
        if (this.is_second_name_error(input_value)) return;
        this.setProps({second_name: input_value});
    }

    is_second_name_error(value: string): boolean {
        if(validation.name(value)) {
            this.children.input_second_name.setProps({error: false, error_text: null});
            return false;
        } else {
            this.children.input_second_name.setProps({error: true, error_text: 'Фамилия не соответствует требованиям'});
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
        if(validation.email(value)) {
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

    on_save() {
        if (this.is_first_name_error(this.props.first_name)
            || this.is_second_name_error(this.props.second_name)
            || this.is_login_error(this.props.login)
            || this.is_email_error(this.props.email)
            || this.is_phone_error(this.props.phone)) {
            
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
