import ILeaderBoard from '../Interfaces/ILeaderBoard';
import ILeaderBoardAux from '../Interfaces/ILeaderBoardAux';
import IMatchModel from '../Interfaces/IMatchModel';
import ITeamModel from '../Interfaces/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { fullTeamStatistics, teamStatistics } from '../utils/leaderBoard';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public teamStats = async (isHomeTeam: boolean)
  : Promise<ServiceResponse<ILeaderBoard[]>> => ({
    status: 'SUCCESSFUL',
    data: teamStatistics(
      isHomeTeam
        ? await this.teamModel.findHomeTeams() as ILeaderBoardAux[]
        : await this.teamModel.findAwayTeams() as ILeaderBoardAux[],
      isHomeTeam,
    ),
  });

  public fullTeamStats = async ()
  : Promise<ServiceResponse<ILeaderBoard[]>> => ({
    status: 'SUCCESSFUL',
    data: fullTeamStatistics(
      await this.teamModel.findTeamsWithMatches() as ILeaderBoardAux[],
    ),
  });
}
