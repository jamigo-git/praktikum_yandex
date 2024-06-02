import Block from "../../core/Block";
import type { Props } from "../../core/Block";

export default class Button extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: (e: Event) => {
                    if(props.onClick) {
                        props.onClick(e)
                    }
                }
            }
        });
    }

    render():string {
        return `
            <button 
                class="button button__{{type}}" 
                {{#if disabled }} disabled {{/if}}
                >
                
                <a class="button_label">{{label}}</a>
            </button>
            `
    }
}
