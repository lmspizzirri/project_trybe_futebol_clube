import IUser from './IUser';

export default interface IUserModel {
  login(email: IUser['email']): Promise<IUser | null>
}
