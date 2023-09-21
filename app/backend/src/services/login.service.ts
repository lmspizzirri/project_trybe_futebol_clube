import * as bcryptjs from 'bcryptjs';
import IUserModel from '../Interfaces/IUserModel';
import UserModel from '../models/UserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IToken from '../Interfaces/IToken';
import Token from '../Interfaces/Token';

export default class LoginService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private JWT: IToken,
  ) {}

  public login = async (email: string, password: string): Promise<ServiceResponse<Token>> => {
    const userByEmail = await this.userModel.findByEmail(email);
    if (!userByEmail) {
      return { status: 'NOT_FOUND', data: { message: 'Email ou Password não encontrado' } };
    }
    const validatePassword = bcryptjs.compareSync(password, userByEmail.password);
    if (!validatePassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Email ou Password não encontrado' } };
    }
    const token = this.JWT.generate(email);
    return { status: 'SUCCESSFUL', data: { token } };
  };
}
