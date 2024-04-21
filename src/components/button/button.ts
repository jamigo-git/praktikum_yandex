import './button.css';
import Block from "../../core/Block";

export default class Button extends Block {
    constructor(props) {
        super(props);
    }

    render():string {
        return `
            <button class="button button__{{type}}" >
                <a href="#" page="nav" class="button_label">{{label}}</a>
            </button>
            `
    }
}
