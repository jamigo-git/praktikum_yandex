import { expect } from "chai";
import { FormLogin } from "./"
import Sinon from "sinon";
import { Button } from "..";

describe('Login Page', () => {
    it.only('Check onClick call', () => {
        const loginPage = new FormLogin({});
        const spyInit = Sinon.spy(loginPage, '_init');
        loginPage._init();
        console.log('spyInit.calledOnce = ' + spyInit.calledOnce)


        loginPage.componentDidMount();
        const component = loginPage.getContent()!;
        const spyOnClick = Sinon.spy(loginPage, 'onClickSend');

        const btnSign = component.querySelector('.button__primary');
        (btnSign as HTMLElement).click();
        console.log(component.innerHTML);
        console.log('spyOnClick.notCalled = ' + spyOnClick.notCalled);

        expect(spyOnClick.calledOnce).to.be.true;

    });

    // it('Show validation error', () => {
    //     // const clock = Sinon.useFakeTimers();
    //     const loginPage = new LoginPage({});
    //     const component = loginPage.getContent()!;

    //     const inputs: HTMLInputElement[] = component.querySelectorAll('input');
    //     inputs.forEach(i => { i.value = 'te'; });


    //     const btnSign = component.querySelector('.button__primary');
    //     btnSign.click();
        
    //     // clock.next();

    //     const errorText = component.querySelector('.input_validation_error')?.innerHTML;
    //     const errorTextAll = component.querySelectorAll('.input_validation_error');
    //     console.log(errorTextAll.length)

    //     // console.log(component)

    //     expect(errorText).to.eql('Логин не соответствует требованиям');
    // })

})
