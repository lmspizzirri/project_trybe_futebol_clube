import ITeamModel from '../Interfaces/ITeamModel';
import TeamModel from '../models/TeamModel';
import ITeam from '../Interfaces/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LoginService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public findTeamById = async (id: number): Promise<ServiceResponse<ITeam>> => {
    const teamById = await this.teamModel.findTeamById(id);
    if (!teamById) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    return { status: 'SUCCESSFUL', data: teamById };
  };
}
