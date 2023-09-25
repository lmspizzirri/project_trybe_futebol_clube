import { IMatch } from './IMatch';
import ITeam from './ITeam';

export default interface ILeaderBoardAux extends ITeam {
  homeTeamMatches: IMatch[],
}
