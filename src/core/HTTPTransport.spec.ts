// test/transport.test.ts
import { expect } from 'chai';
import sinon from 'sinon';
import HTTPTransport, { queryStringify } from './HTTPTransport';
import { BASEURL } from '../utils/Constants';

describe('HTTP Transport', () => {

  describe('get', () => {
    it('Проверка GET запроса с параметрами', async () => {
      const data = { param1: 'value1', param2: 'value2' };
      const requestStub = sinon.stub();
      const transport = new HTTPTransport('');
      transport.request = requestStub;
      await transport.get('/test', { data });
      expect(requestStub.calledWith(`${BASEURL}/test`, { method: 'GET', data: data }, undefined)).to.be.true;
    });
  });

  describe('post', () => {
    it('Проверка POST запроса с параметрами', async () => {
      const data = { param1: 'value1', param2: 'value2' };
      const requestStub = sinon.stub();
      const transport = new HTTPTransport('');
      transport.request = requestStub;
      await transport.post('/test', { data });
      expect(requestStub.calledWith(`${BASEURL}/test`, { method: 'POST', data: data }, undefined)).to.be.true;
    });
  });

  describe('queryStringify', () => {
    it('Проверка работы функции queryStringify()', () => {
      const data = { param1: 'value1', param2: 'value2' };
      const expectedQueryString = '?param1=value1&param2=value2';
      const actualQueryString = queryStringify(data);
      expect(actualQueryString).to.equal(expectedQueryString);
    });
  });
});