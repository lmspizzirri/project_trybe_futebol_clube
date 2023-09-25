import IUser from '../Interfaces/IUser';
import IUserModel from '../Interfaces/IUserModel';
import SequelizeTeam from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeTeam;

  findByEmail = async (email: string): Promise<IUser | null> => {
    const dataUser = await this.model.findOne({ where: { email } });
    if (dataUser === null) return null;
    return {
      id: dataUser.id,
      username: dataUser.username,
      role: dataUser.role,
      email: dataUser.email,
      password: dataUser.password,
    };
  };
}
