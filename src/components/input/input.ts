import Block from "../../core/Block";

export default class Input extends Block {
    constructor(props: any) {
        super(props);
    }

    render(): string {
        return `
            <input
                class="input_element {{class}}"
                placeholder="{{placeholder}}"
                type="{{type}}"
                name="{{name}}"
            />
        `;
    }
}
