import { expect } from "chai";
import LoginPage from "./"
import sinon from "sinon";

describe('Login Page', () => {
    let loginPage = new LoginPage({});

    beforeEach(() => {
        loginPage = new LoginPage({});
    })


    it.skip('Проверка вызова функции onClick при клике на кнопку Войти', () => {
        const component = loginPage.getContent()!;
        // const spyOnClick = Sinon.spy(loginPage.children.formWrapper.children.formBody, 'onClickSend');

        const btnSign = component.querySelector('.button__primary');
        btnSign.click();

        const event = new MouseEvent('click');
        btnSign.element?.dispatchEvent(event);
        console.log()
        // expect(spyOnClick.calledOnce).to.be.true;

    });

    it.skip('Проверка показа ошибки валидации', () => {
        const sandbox = sinon.createSandbox();
        const clock = sandbox.useFakeTimers();
        
        const component = loginPage.getContent()!;

        const inputs: HTMLInputElement[] = component.querySelectorAll('input');
        inputs.forEach(i => { i.value = 'te'; });

        const btnSign = component.querySelector('.button__primary');
        // btnSign.click();

        const event = new MouseEvent('click');
        btnSign.element?.dispatchEvent(event);
        clock.tick(500)
        console.log(component.innerHTML)
        const errorText = component.querySelector('.input_validation_error')?.innerHTML;
        const errorTextAll = component.querySelectorAll('.input_validation_error');
        console.log(errorTextAll.length)

        // console.log(component)

        expect(errorText).to.eql('Логин не соответствует требованиям');
    })

    it('При отсутствии ошибки по api loginError в Store компонент не отображает ее пользователю', () => {
        (window as any).store.set({ loginError: undefined});
        const component = loginPage.getContent()!;
        const errorText = component.querySelector('.api_error')?.innerHTML;
        expect(errorText).to.be.undefined;
    });

    it('При наличии ошибки по api loginError в Store компонент отображает ее пользователю', () => {
        (window as any).store.set({ loginError: 'Login error'});
        const component = loginPage.getContent()!;
        const errorText = component.querySelector('.api_error')?.innerHTML;
        expect(errorText).to.be.not.undefined;
    });
})
