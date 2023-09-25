import ITeamModel from '../Interfaces/ITeamModel';
import TeamModel from '../models/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchModel from '../Interfaces/IMatchModel';
import MatchModel from '../models/MatchModel';
import ILeaderBoard from '../Interfaces/ILeaderBoard';
import homeTeamStatistics from '../utils/leaderBoard';
import ILeaderBoardAux from '../Interfaces/ILeaderBoardAux';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public homeTeamStats = async ()
  : Promise<ServiceResponse<ILeaderBoard[]>> => {
    const data = await this.teamModel.findHomeTeams() as ILeaderBoardAux[];
    const homeLeaderBoard = homeTeamStatistics(data);
    return { status: 'SUCCESSFUL', data: homeLeaderBoard };
  };
}
