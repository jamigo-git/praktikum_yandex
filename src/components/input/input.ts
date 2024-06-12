/**При добавлении пропсов не забудьте обновить input-element, 
 * тк он является враппером input и по факту именно он используется в скриптах */
import Block, { Props } from "../../core/Block";

export default class Input extends Block {
    constructor(props: Props) {
        super(props);
    }

    render(): string {
        return `
            <input
                {{#if id}} id="{{ id }}" {{/if}}
                class="input-element {{ class }}"
                {{#if placeholder}} placeholder="{{ placeholder }}" {{/if}}
                {{#if type}} type="{{ type }}" {{/if}}
                name="{{ name }}"
                {{#if value}} value="{{ value }}" {{/if}}
            />
        `;
    }
}
