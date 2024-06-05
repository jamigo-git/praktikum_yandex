import { expect } from "chai";
import { FormLogin } from "./"
import sinon from "sinon";

describe('FormLogin', () => {

    it.skip('Check onClick call', () => {
        
        const loginPage = new FormLogin({});
        const component = loginPage.getContent();
        
        const spyOnClick = sinon.spy(loginPage, 'onClickSend');
        
        const btnSign = component!.querySelector('.button__primary');
        const event = new MouseEvent('click');
        if (btnSign) btnSign.dispatchEvent(event);

        expect(spyOnClick.calledOnce).to.be.true;

    });

    it.skip('Show validation error', () => {
        // const clock = Sinon.useFakeTimers();
        const loginPage = new FormLogin({});
        const component = loginPage.getContent()!;

        const inputs = component.querySelectorAll('input');
        inputs.forEach(i => { i.value = 'te'; });

        // const event = new MouseEvent('click');
        // component.dispatchEvent(event);

        component.click();

        console.log(component.innerHTML)
        // const btnSign = component.querySelector('.button__primary');
        // btnSign.click();
        
        // clock.next();

        const errorText = component.querySelector('.input_validation_error')?.innerHTML;
        const errorTextAll = component.querySelectorAll('.input_validation_error');
        console.log(errorTextAll.length)

        // console.log(component)

        expect(errorText).to.eql('Логин не соответствует требованиям');
    })

})
