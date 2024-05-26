import Block, { Props } from "../../core/Block";
import { connect } from "../../utils/connect";

class ModalWindow extends Block {
    constructor(props: Props) {
        super({
            ...props
        });
    }
    
    render() {
        return `
            <main class="modal_window_main">
                <div class="modal_window_header">
                    <h2 class="modal_title">{{ title }}</h2>
                </div>
                {{#if textBody}} <div> {{ textBody }} </div> {{/if}}
                <div class="modal_window_body">
                    {{{ modalBody }}}
                </div>
                <div class="modal_window_footer">
                    {{{ button }}}
                </div>
                {{#if modalWindowError}}
                    <div class="api_error"> {{ modalWindowError }} <div>
                {{/if}}
            </main>
        `
    }
}

const mapStateToProps = (store: any) => {
    return {
        modalWindowError: store.modalWindowError
    }
}

export default connect(mapStateToProps)(ModalWindow);
