import ITeam from '../Interfaces/ITeam';
import ITeamModel from '../Interfaces/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAllTeams(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findTeamById(id: number): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData === null) return null;
    return dbData;
  }
}
