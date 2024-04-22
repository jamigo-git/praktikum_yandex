import Block from "../../core/Block";
import Input from "./input";
import ValidationError from "./validation_error";

export default class InputElement extends Block {
    constructor(props: any) {
        super({
            ...props,
            input: new Input({
                class: props.class,
                name: props.name,
                type: props.type,
                placeholder: props.placeholder,
                events: {
                    blur: props.onBlur || (() => {}) 
                }
            }),
            validation_error: new ValidationError({
                error: props.error_text
            })
        });
    }

    componentDidUpdate(old_props: any, new_props: any): boolean {
        if(old_props === new_props) {
            return false;
        }

        this.children.validation_error.setProps(new_props);
        return true;
    }


    render(): string {
        return `
            <div class="input_container {{#if error}}input_error{{/if}}">
                {{{ input }}}
                <span class="input_label">{{ label }}</span>
                {{{ validation_error }}}
            </div>
        `;
    }
}
