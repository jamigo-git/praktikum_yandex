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
            <div class="button_menu dropbtn">
                <a href="#" page="nav" class="button_menu_icon">
                    <div class="menu_line"></div>
                    <div class="menu_line"></div>
                    <div class="menu_line"></div>
                </a>
            </div>
        `
    }
}
