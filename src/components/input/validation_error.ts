import Block from "../../core/Block";

export default class ValidationError extends Block {
    render(): string {
        return (`
            <div class="input-validation-error">{{ error_text }}</div>
        `)
    }
}

