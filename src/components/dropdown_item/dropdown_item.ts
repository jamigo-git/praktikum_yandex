import Block, { Props } from "../../core/Block";

export default class DropdownItem extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: props.onClick
            }
        });
    }

    render():string {
        return `
            <a href=""> {{ label }} </a>
        `
    }
}
