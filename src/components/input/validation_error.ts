import Block from "../../core/Block";

export default class ValidationError extends Block {
    render(): string {
        return (`
            <div class="input_validation_error">{{error_text}}</div>
        `)
    }
}

