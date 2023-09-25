import ITeamModel from '../Interfaces/ITeamModel';
import TeamModel from '../models/TeamModel';
import ITeam from '../Interfaces/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public findAllTeams = async (): Promise<ServiceResponse<ITeam[]>> => {
    const allTeams = await this.teamModel.findAllTeams();
    return { status: 'SUCCESSFUL', data: allTeams };
  };

  public findTeamById = async (id: ITeam['id']): Promise<ServiceResponse<ITeam>> => {
    const teamById = await this.teamModel.findTeamById(id);
    if (!teamById) return { status: 'NOT_FOUND', data: { message: `Team com id ${id} not found` } };
    return { status: 'SUCCESSFUL', data: teamById };
  };
}
