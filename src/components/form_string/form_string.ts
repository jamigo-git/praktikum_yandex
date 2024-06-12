import "./form_string.css";
import Block from "../../core/Block";
import type { Props } from "../../core/Block";

export default class FormString extends Block {
    constructor(props: Props) {
        super(props)
    }

    render(): string {
        return `
            <div class="form-string-container">
                <span class="form-string-label">{{label}}</span>
                <span class="form-string-value">{{value}}</span>
            </div>
        
        `
    }
}
