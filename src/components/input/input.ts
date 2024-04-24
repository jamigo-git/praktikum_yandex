import Block from "../../core/Block";
import type { Props } from "../../core/Block";

export default class Input extends Block {
    constructor(props: Props) {
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
