import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/IMatch';
import { CreateMatchBody } from '../Types/CreateMatchBody';

export default class MatchService {
  constructor(
    private matchModel: MatchModel = new MatchModel(),
    private teamModel: TeamModel = new TeamModel(),
  ) {}

  public findAllMatches = async (): Promise<ServiceResponse<IMatch[]>> => {
    const allMatches = await this.matchModel.findAllMatches();
    return { status: 'SUCCESSFUL', data: allMatches };
  };

  public findFilteredMatches = async (inProgress: string): Promise<ServiceResponse<IMatch[]>> => {
    const filteredMatches = await this.matchModel.findFilteredMatches(inProgress);
    return { status: 'SUCCESSFUL', data: filteredMatches };
  };

  public finishMatch = async (id: number): Promise<ServiceResponse<ServiceMessage>> => {
    const status = await this.matchModel.finishMatch(id);
    if (status === 0) return { status: 'NOT_FOUND', data: { message: 'Erro' } };
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  };

  public updateMatch = async (id: number, awayGoal: number, homeGoal: number):
  Promise<ServiceResponse<ServiceMessage>> => {
    const status = await this.matchModel.updateMatches(id, awayGoal, homeGoal);
    if (status === 0) return { status: 'NOT_FOUND', data: { message: 'Erro' } };
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  };

  public createMatch = async (matchBody: CreateMatchBody):
  Promise<ServiceResponse<CreateMatchBody>> => {
    const homeTeam = await this.teamModel.findTeamById(matchBody.homeTeamId);
    const awayTeam = await this.teamModel.findTeamById(matchBody.awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.matchModel.createMatch(matchBody);
    return { status: 'CREATED', data: newMatch };
  };
}
