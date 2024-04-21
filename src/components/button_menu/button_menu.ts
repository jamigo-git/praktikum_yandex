import Block from "../../core/Block";

export default class ButtonMenu extends Block {
    constructor(props: any) {
        super(props);
    }

    render(): string {
        return `
            <div class="button_menu">
                <a href="#" page="nav" class="button_menu_icon">
                    <div class="menu_line"></div>
                    <div class="menu_line"></div>
                    <div class="menu_line"></div>
                </a>
            </div>
        `
    }
}
