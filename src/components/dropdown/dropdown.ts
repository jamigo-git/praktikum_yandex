import Block, { Props } from "../../core/Block";

export default class Dropdown extends Block {
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
            <ul class="dropdown-content">
                {{{ dropdownItems }}}
            </ul>
        `
    }
}
