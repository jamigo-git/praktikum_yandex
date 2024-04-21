import './button.css';
import Block from "../../core/Block";

export default class Button extends Block {
    constructor(props: any) {
        super({
            ...props,
            events: {
                click: props.onClick
            }
        });
    }

    render():string {
        return `
            <button class="button button__{{type}}" >
                <a class="button_label">{{label}}</a>
            </button>
            `
    }
}
