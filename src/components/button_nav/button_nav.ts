import Block, { Props } from "../../core/Block";

export default class ButtonNav extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: props.onClick
            }
        });
    }

    render(): string {
        return `
            <div class="button-round {{class}}" {{#if btn_type }} type="{{ btn_type }}" {{/if}}>
                <a class="button_icon"></a>
            </div>        
        `;
    }
}
