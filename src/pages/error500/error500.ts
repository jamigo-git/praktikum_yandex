import "./error500.css";
import { Button, ErrorPage } from "../../components";
import Block from "../../core/Block";

export default class Error500 extends Block {
    constructor(props: any) {
        super({
            ...props,
            button_back: new Button({ label:"Назад", type:"secondary" }),
            error500: new ErrorPage({ error_code:"500", error_text:"Что-то пошло не так. Уже чиним." })
        });
    }

    render(): string {
        return `
            <main class="container">
                {{{ error500 }}}
                {{{ button_back }}}
            </main>
        
        `
    }
}
