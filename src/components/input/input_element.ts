import Block from "../../core/Block";
import Input from "./input";

export default class InputElement extends Block {
    constructor(props: any) {
        super({
            ...props,
            Input: new Input({
                class: props.class,
                name: props.name,
                type: props.type,
                placeholder: props.placeholder,
                events: {
                    blur: props.onBlur || (() => {}) 
                }
            })
        });
    }

    render(): string {
        return `
            <div class="input_container">
                {{{ Input }}}
                <span class="input_label">{{label}}</span>
            </div>
        `;
    }
}
