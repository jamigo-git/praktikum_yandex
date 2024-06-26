import { Input, Button, Avatar } from "../index.ts";
import Block, { Props } from "../../core/Block.ts";
import * as validation from "../../utils/validation.ts";
import { getUserInfo } from "../../services/auth.ts";
import isEqual from "../../utils/isEqual.ts";
import { BASEURL } from "../../utils/Constants.ts";
import { onAvatarClick, changeProfile, onLogoutClick } from "../../services/profile";
import { connect } from "../../utils/connect.ts";

const form_fields = [
    "first_name",
    "second_name",
    "display_name",
    "email",
    "login",
    "phone",
    "avatar",
];

class FormProfile extends Block {
    init() {
        const onChangeFirstNameBind = this.onChangeFirstName.bind(this);
        const onChangeSecondNameBind = this.onChangeSecondName.bind(this);
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onChangeEmailBind = this.onChangeEmail.bind(this);
        const onChangePhoneBind = this.onChangePhone.bind(this);
        const onChangeDisplayNameBind = this.onChangeDisplayName.bind(this);
        const onAvatarClickBind = onAvatarClick.bind(this);
        const onLogoutClickBind = onLogoutClick.bind(this);
        const onSaveClickBind = this.onSaveClick.bind(this);

        const user = window.store.getState()?.user;
        const avatar_url = user?.avatar ? `${BASEURL}resources${user.avatar}` : '';

        const avatar = new Avatar({ 
            label: user?.display_name, 
            class:"avatar-profile", 
            avatar: avatar_url, 
            onClick: onAvatarClickBind 
        });

        const inputName = new Input({ 
            label:"Имя", 
            value: user?.first_name, 
            class:"profile-edit-input", 
            name:"first_name", 
            onBlur: onChangeFirstNameBind
        });

        const inputSecondName = new Input({ 
            label:"Фамилия", 
            value: user?.second_name, 
            class:"profile-edit-input", 
            name:"second_name", 
            onBlur: onChangeSecondNameBind  
        });

        const inputLogin = new Input({ 
            label:"Логин", 
            value: user?.login, 
            class:"profile-edit-input", 
            name:"login", 
            validation: onChangeLoginBind 
        });

        const inputEmail = new Input({ 
            label:"Почта", 
            value: user?.email, 
            class:"profile-edit-input", 
            name:"email", 
            onBlur: onChangeEmailBind 
        });
        
        const inputPhone = new Input({ 
            label: "Телефон", 
            value: user?.phone, 
            class:"profile-edit-input", 
            name:"phone", 
            onBlur: onChangePhoneBind 
        });

        const formStrChatName = new Input({ 
            label:"Имя в чате", 
            value: user?.display_name, 
            class:"profile-edit-input", 
            name:"display_name", 
            onBlur: onChangeDisplayNameBind 
        });

        const buttonSave = new Button({ label:"Сохранить", type:"primary", onClick: onSaveClickBind });
        const buttonExit = new Button({ label:"Выйти", type:"secondary", onClick: onLogoutClickBind });

        const propsObj = form_fields.reduce((acc, current) => {
                acc[current as keyof typeof acc] = user![current] as any;
            return acc;
        }, new Object());

        if (user) this.setProps(propsObj);

        this.children = {
            ...this.children,
            avatar,
            inputName,
            inputSecondName,
            inputLogin,
            inputEmail,
            inputPhone,
            buttonSave,
            buttonExit,
            formStrChatName
        }
    }

    /**Запус загрузки данных пользователя после отрисовки компонента в DOM */
    componentDidMount(oldProps: Props): void {
        oldProps;
        if (!window.store.getState()?.user) getUserInfo();
    }

    /**Обновление */
    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (!isEqual(oldProps, newProps) && !oldProps.is_submit && newProps.is_submit) {
            this.Save();
        }
        if(!isEqual(oldProps.user, newProps.user)) {
            const user = window.store.getState()?.user;
            const avatar_url = user?.avatar ? `${BASEURL}resources${user.avatar}` : '';
            if (avatar_url) {
                this.children.avatar.setProps({label: user?.display_name, avatar: avatar_url});
            } else {
                this.children.avatar.setProps({ label: user?.display_name });
            }
        }
        return true;
    }

    onChangeFirstName(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        if (this.isFirstNameError(inputValue)) return;
        this.setProps({first_name: inputValue});
    }

    isFirstNameError(value: string): boolean {
        if(validation.name(value)) {
            this.children.inputName.children?.validation_error?.setProps({ error_text: null});
            return false;
        } else {
            this.children.inputName.children?.validation_error?.setProps({ error_text: 'Имя не соответствует требованиям'});
            return true;
        }
    }

    onChangeSecondName(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        if (this.isSecondNameError(inputValue)) return;
        this.setProps({second_name: inputValue});
    }

    isSecondNameError(value: string): boolean {
        if(validation.name(value)) {
            this.children.inputSecondName.children.validation_error?.setProps({ error_text: null});
            return false;
        } else {
            this.children.inputSecondName.children.validation_error?.setProps({ error_text: 'Фамилия не соответствует требованиям'});
            return true;
        }
    }

    onChangeLogin() {
        const inputValue = (document.getElementsByName('login')[0] as HTMLInputElement)?.value;
        return this.isLoginError(inputValue);
    }

    isLoginError(value: string): boolean {
        if(validation.login(value)) {
            this.children.inputLogin?.сhildren?.validation_error?.setProps({ error_text: null });
            return false;
        } else {
            this.children.inputLogin?.children?.validation_error?.setProps({ error_text: 'Логин не соответствует требованиям' });
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
            this.children.inputEmail.children.validation_error?.setProps({ error_text: null});
            return false;
        } else {
            this.children.inputEmail.children.validation_error?.setProps({ error_text: 'Email не соответствует требованиям'});
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
            this.children.inputPhone?.children.validation_error?.setProps({ error_text: null });
            return false;
        } else {
            this.children.inputPhone?.children.validation_error?.setProps({ error_text: 'Телефон не соответствует требованиям' });
            return true;
        }
    }

    onChangeDisplayName(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        this.setProps({ display_name: inputValue });
    }

    onSaveClick(event: Event) {
        event.preventDefault();
        this.Save();
    }

    Save() {
        const result = [
            this.isFirstNameError((document.getElementsByName('first_name')[0] as HTMLInputElement)?.value),
            this.isSecondNameError((document.getElementsByName('second_name')[0] as HTMLInputElement)?.value),
            this.isLoginError((document.getElementsByName('login')[0] as HTMLInputElement)?.value),
            this.isEmailError((document.getElementsByName('email')[0] as HTMLInputElement)?.value),
            this.isPhoneError((document.getElementsByName('phone')[0] as HTMLInputElement)?.value)
        ];
        if (result.some(res => res === true)) return;
        
        const propsObj = form_fields.reduce((acc, current) => {
            acc[current as keyof typeof acc] = (document.getElementsByName(`${current}`)[0] as HTMLInputElement)?.value as any;
            return acc;
        }, new Object());

        changeProfile(propsObj as any);
    }

    render() {
        return `
            <div class="form_profile">
                {{{ avatar }}}
                <div class="profile-edit-input-container">
                    {{{ inputName }}}
                    {{{ inputSecondName }}}
                    {{{ inputLogin }}}
                    {{{ inputEmail }}}
                    {{{ inputPhone }}}
                    {{{ formStrChatName }}}
                </div>
                <div class="profile-edit-btn-container">
                    {{{ buttonSave }}}
                    {{{ buttonExit }}}
                </div>
            </div>
        `;
    }
}

/**Пропсы из store которые будут тригерить обновление */
const mapStateToProps = (store: any) => {
    return {
        user: store.user
    }
}

export default connect(mapStateToProps)(FormProfile);
