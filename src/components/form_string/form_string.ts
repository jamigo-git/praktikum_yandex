import "./form_string.css";
import Block from "../../core/Block";

export default class FormString extends Block {
    constructor(props: any) {
        super(props)
    }

    render(): string {
        return `
            <div class="form_string__container">
                <span class="form_string__label">{{label}}</span>
                <span class="form_string__value">{{value}}</span>
            </div>
        
        `
    }
}
