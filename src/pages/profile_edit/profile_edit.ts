import { ButtonNav, FormProfile, FormWrapper } from "../../components";
import Block, { Props } from "../../core/Block";
import  AvatarChangeModal from "../profile_edit/avatar_change_modal.ts";
import { connect } from "../../utils/connect.ts";
import { onBackClick } from "../../services/profile";

class ProfilePageEdit extends Block {

    constructor(props: Props) {
        super({
            ...props,
        })
    }

    init() {
        const onBackClickBind = onBackClick.bind(this);

        /**Кнопка перейти назад */
        const buttonBack = new ButtonNav({ class: "button-back", onClick: onBackClickBind  });

        /** Modal windows */
        const avatarChangeModal = new AvatarChangeModal({});

        /**Содержимое формы профиля */
        const formWrapper = new FormWrapper({
            formBody: new FormProfile({}),
            onSubmit: (event: Event) => {
                event.preventDefault();
                this.children.formWrapper.children.formBody.setProps({
                    is_submit: true
                });
            }
        })

        this.children = {
            ...this.children,
            buttonBack,
            avatarChangeModal,
            formWrapper
        }
    }

    render(): string {
        return `
            <main class="profile-edit-container">
                {{{ buttonBack }}}
                {{{ formWrapper }}}
                {{#if showChangeAvatarModal }}
                    <div class="modal-window-container"> {{{ avatarChangeModal }}} </div>
                {{/if}}
            </main>
        `
    }
}

/**Пропсы из store которые будут тригерить обновление */
const mapStateToProps = (store: any) => {
    return {
        showChangeAvatarModal: store.showChangeAvatarModal,
    }
}

export default connect(mapStateToProps)(ProfilePageEdit);
