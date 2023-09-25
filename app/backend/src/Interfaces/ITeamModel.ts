import ITeam from './ITeam';

export default interface ITeamModel {
  findAllTeams(): Promise<ITeam[]>;
  findTeamById(id: ITeam['id']): Promise<ITeam | null>;
  findTeamsWithMatches(): Promise<ITeam[]>;
  findHomeTeams(): Promise<ITeam[]>;
  findAwayTeams(): Promise<ITeam[]>;
}
