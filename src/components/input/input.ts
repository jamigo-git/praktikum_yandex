import Block from "../../core/Block";

export default class Input extends Block {
    constructor(props: any) {
        super(props);
    }

    render(): string {
        return `
            <div class="input__container">
                <input
                    class="input__element {{class}}"
                    placeholder="{{placeholder}}"
                    type="{{type}}"
                    name="{{name}}"
                />
                <span class="input__label">{{label}}</span>
            </div>
            `
    }
}
