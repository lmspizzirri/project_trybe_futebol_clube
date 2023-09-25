import SequelizeMatch from '../database/models/SequelizeMatch';
import ITeam from '../Interfaces/ITeam';
import ITeamModel from '../Interfaces/ITeamModel';
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

  findHomeTeams = async (): Promise <ITeam[]> => {
    const dbData = await this.model
      .findAll({ include:
      { model: SequelizeMatch, foreignKey: 'homeTeamId', where: { inProgress: false } } });
    return dbData;
  };
}
