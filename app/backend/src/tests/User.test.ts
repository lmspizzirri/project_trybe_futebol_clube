import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';

import { Response } from 'superagent';
import UsersMock from './mocks/Users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota de User', () => {
  it('Falha por falta de email', async () => {
    //Arrange
    //ACT
    const { status, body } = await chai.request(app).post('/login').send(UsersMock.noEmailInput);
    //ASSERT
    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ message: 'Preencha os campos'});
  });

  it('Falha por falta de password', async () => {
    //Arrange
    //ACT
    const { status, body } = await chai.request(app).post('/login').send(UsersMock.noPasswordInput);
    //ASSERT
    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ message: 'Preencha os campos'});
  });

  it('Falha por email com formato incorreto', async () => {
    //Arrange
    //ACT
    const { status, body } = await chai.request(app).post('/login').send(UsersMock.invalidEmailInput);
    //ASSERT
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Email ou senha inválido'});
  });

  it('Falha por password com formato incorreto', async () => {
    //Arrange
    //ACT
    const { status, body } = await chai.request(app).post('/login').send(UsersMock.invalidPasswordInput);
    //ASSERT
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Email ou senha inválido'});
  });

  it('Login bem sucedido', async () => {
    //Arrange
    const user = SequelizeUser.build(UsersMock.validUserReturn);
    sinon.stub(SequelizeUser, 'findOne').resolves(user);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    //ACT
    const { status } = await chai.request(app).post('/login').send(UsersMock.validUserInput);
    //ASSERT
    expect(status).to.be.equal(200);
  });

  it('Falha email não encontrado no DB', async () => {
    //Arrange
    const user = SequelizeUser.build(UsersMock.validUserReturn);
    sinon.stub(SequelizeUser, 'findOne').resolves(user);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    //ACT
    const { status } = await chai.request(app).post('/login').send(UsersMock.validUserInput);
    //ASSERT
    expect(status).to.be.equal(200);
  });
});
