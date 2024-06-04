import { expect } from "chai";
import Router from "./Router";
import * as Pages from "./../pages";
import sinon from "sinon";

describe('Проверяем Router', () => {   
    let router: Router;
    const pages_map: Map<string, any> = new Map([
        ['/', Pages.LoginPage],
        ['/login', Pages.LoginPage],
        ['/settings', Pages.ProfilePage],
        ['/settings', Pages.ProfilePage],
        ['/settings_edit', Pages.ProfilePage],
        ['/500', Pages.PassEditPage],
        ['/pass_edit', Pages.PassEditPage],
        ['/messenger', Pages.ChatPage]
    ]);

    router = new Router('#app');

    pages_map.forEach((value, key) => {
        router.use(key, value);
    });

    router.use('*', Pages.Error404)
            .start();

    it('Переход на новую страницу должен менять состояние сущности history', () => {
        router.go('/login');
        router.go('/settings');
        expect(window.history.length).to.eq(3);
    });

    it.skip('Проверка работы страницы 404', () => {
        router.go('/no_page');
        let label_404: HTMLLabelElement | null = document.querySelector('.error_code_label');
        expect(label_404?.innerText).to.eq('404');
    });

    describe ('Проверяем переходы по зарегистрированным страницам ', () => {
        pages_map.forEach((value, key) => {
            value;
            it(`Проверка перехода на страницу ${key}`, () => {
                router.go(key);
                let pathname = window.location.pathname;
                expect(pathname).to.eq(key);
            });
        });
    });


    it('При вызове метода back в адресной строке должен быть предыдущий адрес', () => {
        const sandbox = sinon.createSandbox();
        const clock = sandbox.useFakeTimers();
        clock.reset();
        router.go('/login');
        router.go('/settings');
        router.back();
        clock.runAll();
        let pathname = window.location.pathname;
        expect(pathname).to.eq('/login');
        clock.restore();
    });
 
  }); 
  