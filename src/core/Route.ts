import type { Props } from "./Block";
import Block from "./Block";

class Route {
    _pathname: string;
    _blockClass: Block;
    _block: Block | null;
    _props: Props | undefined;
    _checkAuth: Function | undefined;

    constructor(pathname: string, view: Block, props: Props, checkAuth?: Function) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
        this._checkAuth = checkAuth;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    _renderDom(query: any, block: Block | null) {
        const root = document.querySelector(query);
        root.append(block?.getContent());
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass({});
            this._renderDom(this._props?.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

export default Route;