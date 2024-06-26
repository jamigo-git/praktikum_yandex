import { FormString, Button, Avatar, ButtonNav } from "../../components";
import Block from "../../core/Block";
import type { Props } from "../../core/Block";
import { getUserInfo } from "../../services/auth"
import { connect } from "../../utils/connect";
import { BASEURL } from "../../utils/Constants";
import isEqual from "../../utils/isEqual";
import { onEditDataClick, onPassEditClick, onLogoutClick } from "../../services/profile";

class ProfilePage extends Block {

    constructor(props: Props) {
        super({
            ...props,
        })
    }

    /**Запус загрузки данных пользователя после отрисовки компонента в DOM */
    componentDidMount(oldProps: Props): void {
        oldProps;
        getUserInfo();
    }

    /**Обновление */
    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if(!isEqual(oldProps.user, newProps.user)) {
            const user = window.store.getState()?.user;
            
            this.children.formStrName.setProps({ value: user?.first_name });
            this.children.formStrLastName.setProps({ value: user?.second_name });
            this.children.formStrLogin.setProps({ value: user?.login });
            this.children.formStrEmail.setProps({ value: user?.email });
            this.children.formStrPhone.setProps({ value: user?.phone });
            this.children.formStrChatName.setProps({ value: user?.display_name });
            
            const avatar_url = user?.avatar ? `${BASEURL}resources\\${user.avatar}` : '';
            
            if (avatar_url) {
                this.children.avatar.setProps({ label: user?.display_name, avatar: avatar_url });
            } else {
                this.children.avatar.setProps({ label: user?.login });
            }
        }
        return true;
    }

    init() {

        const onBackClickBind = this.onBackClick.bind(this);
        const onEditDataClickBind = onEditDataClick.bind(this);
        const onPassEditClickBind = onPassEditClick.bind(this);
        const onLogoutClickBind = onLogoutClick.bind(this);
        const user = window.store.getState()?.user;
        
        const buttonBack = new ButtonNav({ class: "button-back", onClick: onBackClickBind });
        const avatar = new Avatar({ label: user?.display_name, class: "avatar-profile", avatar: user?.avatar ? `${BASEURL}resources\\${user.avatar}` : undefined });
        const formStrName = new FormString({ label:"Имя", value: user?.first_name });
        const formStrLastName = new FormString({ label:"Фамилия", value: user?.second_name });
        const formStrLogin = new FormString({ label:"Логин", value: user?.login });
        const formStrEmail = new FormString({ label:"Почта", value: user?.email });
        const formStrPhone = new FormString({ label:"Телефон", value: user?.phone });
        const formStrChatName = new FormString({ label:"Имя в чате", value: user?.display_name });

        const buttonEditData = new Button({ label:"Изменить данные", type:"secondary", onClick: onEditDataClickBind });
        const buttonEditPassword = new Button({ label:"Изменить пароль", type:"secondary", onClick: onPassEditClickBind });
        const buttonExit = new Button({ label:"Выйти", type:"secondary", onClick: onLogoutClickBind });

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
            formStrChatName
        }
    }
    
    onBackClick() {
        window.router.go('/messenger');
    }

    render(): string {
        return `
            <main class="container">
                {{#if isLoading }}
                    <h2>SPINNER</h2>
                {{ else }}
                    {{{ buttonBack }}}
                    <Form class="profile-form">
                        {{{ avatar }}}
                        <div class="fields_container">
                            {{{ formStrName }}}
                            {{{ formStrLastName }}}
                            {{{ formStrLogin }}}
                            {{{ formStrEmail }}}
                            {{{ formStrPhone }}}
                            {{{ formStrChatName }}}
                        </div>
                        <div class="btn-container">
                            {{{ buttonEditData }}}
                            {{{ buttonEditPassword }}}
                            {{{ buttonExit }}}
                        </div>
                    </Form>
                {{/if}}
            </main>       
        `;
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

export default connect(mapStateToProps)(ProfilePage);
