import "./error404.css";
import { Button, ErrorPage } from "../../components";
import Block from "../../core/Block";
import { connect } from "../../utils/connect";

class Error404 extends Block {

    init() {
        const onBackClickBind = this.onBackClick.bind(this);

        const buttonBack = new Button({ label:"Назад", type:"secondary", onClick: onBackClickBind });
        const error404 = new ErrorPage({ error_code:"404", error_text:"Извините такой страницы не существует." });

        this.children = {
            ...this.children,
            buttonBack,
            error404
        }
    }

    onBackClick() {
        (window as any).router.back();
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

/**Пропсы из store которые будут тригерить обновление */
const mapStateToProps = (store: any) => {
    return {
        isLoading: store.isLoading
    }
}

export default connect(mapStateToProps)(Error404);
