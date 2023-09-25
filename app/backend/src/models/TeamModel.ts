import ITeam from '../Interfaces/ITeam';
import ITeamModel from '../Interfaces/ITeamModel';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  findAllTeams = async (): Promise<ITeam[]> => {
    const dbData = await this.model.findAll();
    return dbData;
  };

  findTeamById = async (id: ITeam['id']): Promise<ITeam | null> => {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;
    return dbData;
  };

  findTeamsWithMatches = async (): Promise <ITeam[]> => {
    const dbData = await this.model
      .findAll({
        include: [{
          model: SequelizeMatch,
          as: 'homeTeamMatches',
          where: { inProgress: false },
        }, {
          model: SequelizeMatch,
          as: 'awayTeamMatches',
          where: { inProgress: false },
        }],
      });

    return dbData;
  };

  findHomeTeams = async (): Promise <ITeam[]> => {
    const dbData = await this.model
      .findAll({
        include: {
          model: SequelizeMatch,
          as: 'homeTeamMatches',
          where: { inProgress: false },
        },
      });

    return dbData;
  };

  findAwayTeams = async (): Promise <ITeam[]> => {
    const dbData = await this.model
      .findAll({
        include: {
          model: SequelizeMatch,
          as: 'awayTeamMatches',
          where: { inProgress: false },
        },
      });

    return dbData;
  };
}
