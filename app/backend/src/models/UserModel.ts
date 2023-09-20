import IUser from '../Interfaces/IUser';
import IUserModel from '../Interfaces/IUserModel';
import SequelizeTeam from '../database/models/UserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeTeam;

  async login(email: string): Promise<IUser | null> {
    const dbUser = await this.model.findOne({ where: { email } });
    if (dbUser === null) return null;
    return dbUser;
  }
}
