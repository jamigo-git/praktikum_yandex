// test/transport.test.ts
import { expect } from 'chai';
import sinon from 'sinon';
import HTTPTransport, { queryStringify } from './HTTPTransport';
import { BASEURL } from '../utils/Constants';

describe('HTTP Transport', () => {
    let transport: HTTPTransport;
    let requestStub: sinon.SinonStub<any[], any>;
    const data = { param1: 'value1', param2: 'value2' };
    
    beforeEach(() => {
        transport = new HTTPTransport('');
        requestStub = sinon.stub();
    })

    describe('Проверка запросов', () => {
        it('Проверка GET запроса с параметрами', async () => {
        transport.request = requestStub;
        await transport.get('/test', { data });
        expect(requestStub.calledWith(`${BASEURL}/test`, { method: 'GET', data: data }, undefined)).to.be.true;
        });

        it('Проверка POST запроса с параметрами', async () => {
            transport.request = requestStub;
            await transport.post('/test', { data });
            expect(requestStub.calledWith(`${BASEURL}/test`, { method: 'POST', data: data }, undefined)).to.be.true;
        });

        it('Проверка PUT запроса с параметрами', async () => {
            transport.request = requestStub;
            await transport.put('/test', { data });
            expect(requestStub.calledWith(`${BASEURL}/test`, { method: 'PUT', data: data }, undefined)).to.be.true;
        });

        it('Проверка DELETE запроса с параметрами', async () => {
            transport.request = requestStub;
            await transport.delete('/delete', { data });
            expect(requestStub.calledWith(`${BASEURL}/delete`, { method: 'DELETE', data: data }, undefined)).to.be.true;
        });
    });

    describe('Проверка вспомогательных методов', () => {
        it('Проверка работы функции queryStringify()', () => {
        const data = { param1: 'value1', param2: 'value2' };
        const expectedQueryString = '?param1=value1&param2=value2';
        const actualQueryString = queryStringify(data);
        expect(actualQueryString).to.equal(expectedQueryString);
        });
    });
});
