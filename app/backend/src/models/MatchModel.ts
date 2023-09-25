import { CreateMatchBody } from '../Types/CreateMatchBody';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatch } from '../Interfaces/IMatch';
import IMatchModel from '../Interfaces/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  findAllMatches = async (): Promise<IMatch[]> => {
    const dbData = await this.model.findAll({ include: [
      { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
      { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
    ],
    });
    return dbData;
  };

  findFilteredMatches = async (inProgress: string): Promise<IMatch[]> => {
    let boolean = true;
    if (inProgress === 'false') boolean = false;
    const dbMatches = await this.model.findAll({
      where: { inProgress: boolean },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbMatches.map((match) => match);
  };

  finishMatch = async (id: number):Promise<number> => {
    const affectedRows = await this.model.update({
      inProgress: false }, { where: { id } });
    if (!affectedRows) return 0;
    return 1;
  };

  updateMatches =
  async (id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<number> => {
    const affectedRows = await this.model.update({
      homeTeamGoals, awayTeamGoals }, { where: { id } });
    if (!affectedRows) return 0;
    return 1;
  };

  createMatch = async (matchbody: CreateMatchBody): Promise<CreateMatchBody> => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = matchbody;
    const newMatch = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return newMatch;
  };
}
