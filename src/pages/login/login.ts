import { FormWrapper, FormLogin } from "../../components";
import Block, { Props } from "../../core/Block";
import { connect } from "../../utils/connect";

class LoginPage extends Block {
    constructor(props: Props) {
        super({
            ...props,
            formWrapper: new FormWrapper({
                formBody: new FormLogin({}),
                onSubmit: (event: any) => {
                    this.children.formBody.setProps({
                        login: event.target.elements.login.value,
                        password: event.target.elements.password.value,
                        is_submit: true
                    });
                }
            })
        })
    }

    render() {
        return `
            <div class="container">
                <main class="container">
                    {{{ formWrapper }}}
                    {{#if loginError}}
                        <div class="api-error"> {{ loginError }} <div>
                    {{/if}}
                </main>
            </div>
        `
    }
}

const mapStateToProps = (store: any) => {
    return {
        loginError: store.loginError
    }
}

export default connect(mapStateToProps)(LoginPage);

