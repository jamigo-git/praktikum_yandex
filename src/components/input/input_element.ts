import Block, { Props } from "../../core/Block";
import Input from "./input";
import ValidationError from "./validation_error";

export default class InputElement extends Block {
    constructor(props: Props) {
        super({
            ...props,
            input: new Input({
                class: props.class,
                name: props.name,
                type: props.type,
                placeholder: props.placeholder,
                value: props.value,
                id: props.id,
                events: {
                    blur: props.onBlur || (() => {}),
                    change: props.onChange || (() => {})
                }
            }),
            validation_error: new ValidationError({
                error_text: props.error_text
            })
        });
    }

    componentDidUpdate(old_props: Props, new_props: Props): boolean {
        if(old_props === new_props) {
            return false;
        }
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
