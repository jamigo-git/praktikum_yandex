import { expect } from "chai";
import LoginPage from "./"
import Sinon from "sinon";

describe('Login Page', () => {
    // it.only('Check onClick call', () => {
    //     const loginPage = new LoginPage({});
    //     const component = loginPage.getContent()!;
    //     const spyOnClick = Sinon.spy(component.children.formWrapper.children.formBody, 'onClickSend');

    //     const btnSign = component.querySelector('.button__primary');
    //     btnSign.click();

    //     expect(spyOnClick.calledOnce).to.be.true;

    // });

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
