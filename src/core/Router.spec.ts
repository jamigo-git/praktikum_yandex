import { expect } from "chai";
import Router from "./Router";
import sinon from "sinon";
import Block, { Props } from "./Block";

describe('Проверяем Router', () => {   
    let PageClass: typeof Block;
    let sandbox: sinon.SinonSandbox;
    let clock: sinon.SinonFakeTimers;
    let router = new Router('#app');

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        clock = sandbox.useFakeTimers();
        class Page extends Block {
            constructor(props: Props) {
                super({
                    ...props
                })
            }

            render(): string {
                return `<div>
                    <span id="test"></span>
                </div>`
            }
        };

        PageClass = Page;
    });
    
    afterEach(() => {
        clock.restore();
    })

    it('Переход на новую страницу должен менять состояние сущности history', () => {
        router.use('/test', PageClass).start();
        router.go('/test');
        clock.next();
        /**Первая страница будет начальная */
        expect(window.history.length).to.eq(2);
    });

    it('При вызове метода back в адресной строке должен быть предыдущий адрес', () => {
        router.use('/test1', PageClass).use('/test2', PageClass).start();
        router.go('/test1');
        router.go('/test2');
        router.back();
        clock.tick(500);
        let pathname = window.location.pathname;
        expect(pathname).to.eq('/test1');
    });
})

  
