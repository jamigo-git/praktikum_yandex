import "./error500.css";
import { Button, ErrorPage } from "../../components";
import Block from "../../core/Block";

export default class Error500 extends Block {

    init() {
        const onBackClickBind = this.onBackClick.bind(this);

        const buttonBack = new Button({ label:"Назад", type:"secondary", onClick: onBackClickBind });
        const error500 = new ErrorPage({ error_code:"500", error_text:"Что-то пошло не так. Уже чиним." });

        this.children = {
            ...this.children,
            buttonBack,
            error500
        }
    }

    onBackClick() {
        (window as any).router.back();
    }

    render(): string {
        return `
            <main class="container">
                {{{ error500 }}}
                {{{ buttonBack }}}
            </main>
        
        `
    }
}
