import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';

import { Response } from 'superagent';
import teams from './mocks/Teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota teams', () => {
  beforeEach(()=> sinon.restore());

  it('Retorna todos os times', async () => {
    //ARRANGE
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams);
    //ACT
    const { status, body } = await chai.request(app).get('/teams');
    //ASSERT
    expect(status).to.equal(200);
    expect(body).to.deeep.equal(teams);
  });

  it('Retorna time pelo id com sucesso', async () => {
    //ARRANGE
    sinon.stub(SequelizeTeam, 'findByPk').resolves(teams[0]);
    //ACT
    const { status, body } = await chai.request(app).get('/teams/1');
    //ASSERT
    expect(status).to.equal(200);
    expect(body).to.deeep.equal(teams[0]);
  });

  it('Retorna time pelo id com falha', async () => {
    //ARRANGE
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
    //ACT
    const { status, body } = await chai.request(app).get('/teams/3');
    //ASSERT
    expect(status).to.equal(404);
    expect(body).to.deeep.equal('Team not found');
  });

});
