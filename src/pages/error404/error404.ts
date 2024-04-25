import "./error404.css";
import { Button, ErrorPage } from "../../components";
import Block from "../../core/Block";
import type { Props } from "../../core/Block";

export default class Error404 extends Block {
    constructor(props: Props) {
        super({
            ...props,
            buttonBack: new Button({ label:"Назад", type:"secondary" }),
            error404: new ErrorPage({ error_code:"404", error_text:"Извините такой страницы не существует." })
        });
    }

    render(): string {
        return `
            <main class="container">
                {{{ error404 }}}
                {{{ buttonBack }}}
            </main>
        `;
    }
}
