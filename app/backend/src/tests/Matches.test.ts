import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import MatchesMock from './mocks/Matches.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota de match', () => {
  beforeEach(() => sinon.restore());

  it('Retorna todas as matches', async () => {
    //ARRANGE
    sinon.stub(SequelizeMatch, 'findAll').resolves( MatchesMock.validMatches as any);
    //ACT
    const { status, body } = await chai.request(app).get('/matches');
    //ASSERT
    expect(status).to.equal(200);
    expect(body).to.deep.equal(MatchesMock.validMatches);
  });

  it('Retorna todas as matches em progresso', async() => {
    //ARRANGE
    sinon.stub(SequelizeMatch, 'findAll').resolves(MatchesMock.validMatchesInProgress as any);
    //ACT
    const { status, body } = await chai.request(app).get('/matches?inProggress=true');
    //ASSERT
    expect(status).to.equal(200);
    expect(body).to.deep.equal(MatchesMock.validMatchesInProgress);
  })

  it('Retorna todas as matches finalizadas', async() => {
    //ARRANGE
    sinon.stub(SequelizeMatch, 'findAll').resolves(MatchesMock.validMatchesFinished as any);
    //ACT
    const { status, body } = await chai.request(app).get('/matches?inProggress=false');
    //ASSERT
    expect(status).to.equal(200);
    expect(body).to.deep.equal(MatchesMock.validMatchesFinished);
  })

  it('Falha em caso de requisição sem token', async () => {
    // ARRANGE
    // ACT
    const response = await chai.request(app).patch('/matches/1/finish').set({ authorization: ''});
    // ASSERT
    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal({ message: 'Token not found' });
  });

  it('Falha em caso de token invalido', async () => {
    // ARRANGE
    // ACT
    const response = await chai.request(app).patch('/matches/1/finish').set({ authorization: 'ABCD'});
    // ASSERT
    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal({ message: 'Token must be a valid token' });
  });
});
