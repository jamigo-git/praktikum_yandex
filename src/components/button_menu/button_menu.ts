import Block, { Props } from "../../core/Block";

export default class ButtonMenu extends Block {
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
            <div class="button-menu dropbtn">
                <a href="#" page="nav" class="button-menu_icon">
                    <div class="menu-line"></div>
                    <div class="menu-line"></div>
                    <div class="menu-line"></div>
                </a>
            </div>
        `
    }
}
