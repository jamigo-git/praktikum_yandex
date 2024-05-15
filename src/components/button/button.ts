import Block from "../../core/Block";
import type { Props } from "../../core/Block";

export default class Button extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: props.onClick
            }
        });
    }

    render():string {
        return `
            <button 
                class="button button__{{type}}" 
                {{#if btn_type }} type="{{ btn_type }}" {{/if}}
                {{#if disabled }} disabled {{/if}}
                >
                
                <a class="button_label">{{label}}</a>
            </button>
            `
    }
}
