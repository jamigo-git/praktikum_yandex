import { expect } from "chai";
import sinon from 'sinon';
import Block from "./Block";

interface Props {
    text?: string,
    events?: Record<string, () => void>
}

describe('Block', () => {
    let PageClass: typeof Block;

    before(() => {
        class Page extends Block {
            constructor(props: Props) {
                super({
                    ...props
                })
            }

            render(): string {
                return `<div>
                    <span id="test-text">{{ text }}</span>
                    <button>{{ text-button }}</button>
                </div>`
            }
        };

        PageClass = Page;
    });

    it('Должен создать компонент с состоянием из конструктора', () => {
        const text = 'Hello'
        const pageComponent = new PageClass({ text });
        const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;
        expect(spanText).to.be.eq(text);
    })

    it('Компонент должен иметь реактивное поведение', () => {
        const text = 'new value'
        const pageComponent = new PageClass({text: 'Hello'});
        pageComponent.setProps({ text })
        const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;
        expect(spanText).to.be.eq(text);
    })

    it('Компонент должен установить события на элемент', () => {
        const handlerStub = sinon.stub();
        const pageComponent = new PageClass({events: {
            click: handlerStub
        }});
        const event = new MouseEvent('click');
        pageComponent.element?.dispatchEvent(event);
        expect(handlerStub.calledOnce).to.be.true;
    })
    
    it('Компонент должен вызвать dispatchComponentDidMount метод', () => {
        const sandbox = sinon.createSandbox();
        const clock = sandbox.useFakeTimers();
        const pageComponent = new PageClass();
        const spyCDM = sinon.spy(pageComponent, 'componentDidMount');
        const element = pageComponent.getContent();
        document.body.append(element!);
        clock.next();
        expect(spyCDM.calledOnce).to.be.true;
        clock.restore();
    });

    it('Проверка работы метода show()', () => {
        const pageComponent = new PageClass({text: 'Hello'});
        pageComponent.show();
        const contentStyleDisplay = pageComponent.getContent()?.style.display;
        expect(contentStyleDisplay).to.be.eq('block');
    })

    it('Проверка работы метода hide()', () => {
        const pageComponent = new PageClass({text: 'Hello'});
        pageComponent.hide();
        const contentStyleDisplay = pageComponent.getContent()?.style.display;
        expect(contentStyleDisplay).to.be.eq('none');
    })
});
