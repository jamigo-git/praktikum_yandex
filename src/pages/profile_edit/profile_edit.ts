import { Input, Button, Avatar, ButtonNav } from "../../components";
import Block, { Props } from "../../core/Block";
import * as validation from "../../utils/validation.ts";
import  AvatarChangeModal from "../profile_edit/avatar_change_modal.ts";
import { connect } from "../../utils/connect.ts";
import { onBackClick, onAvatarClick, changeProfile } from "../../services/profile";
import { getUserInfo } from "../../services/auth.ts";
import isEqual from "../../utils/isEqual.ts";
import { BASEURL } from "../../core/Constants.ts";

class ProfilePageEdit extends Block {

    constructor(props: Props) {
        super({
            ...props,
        })
    }

    /**Запус загрузки данных пользователя после отрисовки компонента в DOM */
    componentDidMount(oldProps: Props): void {
        if (!(window as any).store.state.user) getUserInfo();
    }

    /**Обновление */
    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if(!isEqual(oldProps.user, newProps.user)) {
            // const user = (window as any).store.state.user;
            
            // this.children.inputName.setProps({ value: user?.first_name });
            // this.children.inputSecondName.setProps({ value: user?.second_name });
            // this.children.inputLogin.setProps({ value: user?.login });
            // this.children.inputEmail.setProps({ value: user?.email });
            // this.children.inputPhone.setProps({ value: user?.phone });
            
            // const avatar_url = user?.avatar ? `${BASEURL}resources\\${user.avatar}` : '';
            // if (avatar_url) {
            //     this.children.avatar.setProps({label: user?.login, avatar: avatar_url});
            // } else {
            //     this.children.avatar.setProps({ label: user?.login });
            // }
        }
        return true;
    }

    init() {
        const onChangeFirstNameBind = this.onChangeFirstName.bind(this);
        const onChangeSecondNameBind = this.onChangeSecondName.bind(this);
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onChangeEmailBind = this.onChangeEmail.bind(this);
        const onChangePhoneBind = this.onChangePhone.bind(this);
        const onBackClickBind = onBackClick.bind(this);
        const onAvatarClickBind = onAvatarClick.bind(this);

        const onSaveBind = this.onSave.bind(this);

        const user = (window as any).store.state.user;
        const avatar_url = user?.avatar ? `${BASEURL}resources\\${user.avatar}` : '';
        const buttonBack = new ButtonNav({ class: "button_back", onClick: onBackClickBind  });
        const avatar = new Avatar({ label: user?.login, class:"avatar_profile", avatar: avatar_url, onClick: onAvatarClickBind });
        const inputName = new Input({ label:"Имя", value: user?.first_name, class:"profile_edit_input", name:"first_name", onBlur: onChangeFirstNameBind});
        const inputSecondName = new Input({ label:"Фамилия", value: user?.second_name, class:"profile_edit_input", name:"second_name", onBlur: onChangeSecondNameBind  });
        const inputLogin = new Input({ label:"Логин", value: user?.login, class:"profile_edit_input", name:"login", onBlur: onChangeLoginBind });
        const inputEmail = new Input({ label:"Почта", value: user?.email, class:"profile_edit_input", name:"email", onBlur: onChangeEmailBind });
        const inputPhone = new Input({ label: "Телефон", value: user?.phone, class:"profile_edit_input", name:"phone", onBlur: onChangePhoneBind });
        const buttonSave = new Button({ label:"Сохранить", type:"primary", onClick: onSaveBind });
        const buttonExit = new Button({ label:"Выйти", type:"secondary" });

        /** Modal windows */
        const avatarChangeModal = new AvatarChangeModal({});

        if (user) {
            this.setProps({
                first_name: user.first_name,
                second_name: user.second_name,
                email: user.email,
                login: user.login,
                phone: user.phone,
                avatar: user.avatar
            })
        }

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
            avatarChangeModal
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
        
        changeProfile({
            first_name: this.props.first_name,
            second_name: this.props.second_name,
            login: this.props.login,
            display_name: this.props.login,
            email: this.props.email,
            phone: this.props.phone,
        })
    }

    render(): string {
        return `
            <main class="profile_edit_container">
                {{#if isLoading }}
                    <h2>SPINER</h2>
                {{ else }}
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
                {{/if}}
                {{#if showChangeAvatarModal }}
                    <div class="modal_window_container"> {{{ avatarChangeModal }}} </div>
                {{/if}}
            </main>
        `
    }
}

/**Пропсы из store которые будут тригерить обновление */
const mapStateToProps = (store: any) => {
    return {
        user: store.user,
        isLoading: store.isLoading,
        showChangeAvatarModal: store.showChangeAvatarModal,
    }
}

export default connect(mapStateToProps)(ProfilePageEdit);
