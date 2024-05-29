import Block from "../../core/Block";
import type { Props } from "../../core/Block";

export default class FormWrapper extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                submit: props.onSubmit
            }
        });
    }

    render() {
        return `      
            <Form class="{{class}}">
                {{{ formBody }}} 
            </Form>
        `
    }
}
