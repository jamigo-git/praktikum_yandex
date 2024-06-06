import { expect } from "chai";
import { FormLogin } from "./"
import sinon from "sinon";

describe('FormLogin', () => {

    it.skip('Проверка срабатывания функции onClick', () => {
        
        const formLogin = new FormLogin({});
        const spyOnClick = sinon.spy(formLogin, 'onClickSend');
        const btnSign = formLogin.element!.querySelector('.button__primary');

        // const event = new MouseEvent('click');
        // if (btnSign) btnSign.dispatchEvent(event);
        if (btnSign) (btnSign as HTMLElement).click();

        console.log(formLogin.element?.innerHTML)

        expect(spyOnClick.calledOnce).to.be.true;

    });

    it.skip('Show validation error', () => {
        const sandbox = sinon.createSandbox();
        const clock = sandbox.useFakeTimers();

        const formLogin = new FormLogin({});
        
        const inputs = formLogin.element!.querySelectorAll('input');
        inputs.forEach(i => { i.value = 'te'; });
        
        const btnSign = formLogin.element!.querySelector('.button__primary');
        const event = new MouseEvent('click');
        (btnSign as HTMLElement).dispatchEvent(event);
        // if (btnSign) (btnSign as HTMLElement).click();

        clock.runAll();

        console.log(formLogin.element!.innerHTML)
        clock.restore();

        // const errorText = formLogin.element!.querySelector('.input_validation_error')?.innerHTML;
        // const errorTextAll = formLogin.element!.querySelectorAll('.input_validation_error');
        // console.log(errorTextAll.length)
        // expect(errorText).to.eql('Логин не соответствует требованиям');
    })

})
