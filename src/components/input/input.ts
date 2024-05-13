/**При добавлении пропсов не забудьте обновить input_element, 
 * тк он является враппером input и по факту именно он используется в скриптах */
import Block from "../../core/Block";
import type { Props } from "../../core/Block";

export default class Input extends Block {
    constructor(props: Props) {
        super(props);
    }

    render(): string {
        return `
            <input
                class="input_element {{ class }}"
                {{#if placeholder}} placeholder="{{ placeholder }}" {{/if}}
                {{#if type}} type="{{ type }}" {{/if}}
                name="{{ name }}"
                {{#if value}} value="{{ value }}" {{/if}}
            />
        `;
    }
}
