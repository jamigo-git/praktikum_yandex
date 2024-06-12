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
            <main class="modal-window-main">
                <div class="modal-window-header">
                    <h2 class="modal_title">{{ title }}</h2>
                </div>
                <div class="modal-window-body">
                    {{#if textBody}} <div class="text-body"> {{ textBody }} </div> {{/if}}
                    {{{ modalBody }}}
                </div>
                <div class="modal-window-footer">
                    {{{ button }}}
                </div>
                {{#if modalWindowError}}
                    <div class="api-error"> {{ modalWindowError }} <div>
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
