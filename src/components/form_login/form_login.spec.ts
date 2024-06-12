import { expect } from "chai";
import { FormLogin } from "./"
import sinon from "sinon";

describe('FormLogin', () => {

    it('Проверка срабатывания функции onClick', () => {
        const spyOnClick = sinon.spy(FormLogin.prototype, 'onClickSend');
        const formLogin = new FormLogin({});
        const btnSign = formLogin.element!.querySelector('.button-primary');
        if (btnSign) (btnSign as HTMLElement).click();
        expect(spyOnClick.calledOnce).to.be.true;

    });

    it('Проверка показа ошибок', () => {
        const formLogin = new FormLogin({});
        const inputs = formLogin.element!.querySelectorAll('input');
        inputs.forEach(i => { i.value = 'te'; });
        const btnSign = formLogin.element!.querySelector('.button-primary');
        if (btnSign) (btnSign as HTMLElement).click();
        const errorText = formLogin.element!.querySelector('.input-validation-error')?.innerHTML;
        expect(errorText).to.eql('Логин не соответствует требованиям');
    })
})
