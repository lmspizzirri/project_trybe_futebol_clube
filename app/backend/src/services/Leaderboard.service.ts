import ITeamModel from '../Interfaces/ITeamModel';
import TeamModel from '../models/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ILeaderBoard from '../Interfaces/ILeaderBoard';
import homeTeamStatistics from '../utils/leaderBoard';
import ILeaderBoardAux from '../Interfaces/ILeaderBoardAux';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public homeTeamStats = async ()
  : Promise<ServiceResponse<ILeaderBoard[]>> => {
    const data = await this.teamModel.findHomeTeams() as ILeaderBoardAux[];
    const homeLeaderBoard = homeTeamStatistics(data);
    return { status: 'SUCCESSFUL', data: homeLeaderBoard };
  };

  // public awayTeamStats = async ()
  // : Promise<ServiceResponse<ILeaderBoard[]>> => {
  //   const data = await this.teamModel.findHomeTeams() as ILeaderBoardAux[];
  //   const homeLeaderBoard = homeTeamStatistics(data);
  //   return { status: 'SUCCESSFUL', data: homeLeaderBoard };
  // };
}
