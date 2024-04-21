import "./error.css";
import Block from "../../core/Block";

export default class ErrorPage extends Block {
    constructor(props: any) {
        super(props)
    }

    render(): string {
        return `
            <div class="container">
                <label class="error_code_label" >{{error_code}}</label>
                <label class="error_text" >{{error_text}}</div>
            </div>
        `;
    }
}
