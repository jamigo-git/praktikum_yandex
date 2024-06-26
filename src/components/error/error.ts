import "./error.css";
import Block from "../../core/Block";
import type { Props } from "../../core/Block";

export default class ErrorPage extends Block {
    constructor(props: Props) {
        super(props)
    }

    render(): string {
        return `
            <div class="container">
                <label class="error-code-label" >{{error_code}}</label>
                <label class="error_text" >{{error_text}}</div>
            </div>
        `;
    }
}
