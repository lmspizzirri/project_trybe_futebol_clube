import * as bcryptjs from 'bcryptjs';
import IUserModel from '../Interfaces/IUserModel';
import UserModel from '../models/UserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IToken from '../Interfaces/IToken';
import Token from '../Interfaces/Token';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private JWT: IToken,
    private invalid: string = 'Invalid email or password',
  ) {}

  public login = async (email: string, password: string): Promise<ServiceResponse<Token>> => {
    const userByEmail = await this.userModel.findByEmail(email);
    if (!userByEmail) {
      return { status: 'UNAUTHORIZED', data: { message: this.invalid } };
    }
    const validatePassword = bcryptjs.compareSync(password, userByEmail.password);
    if (!validatePassword) {
      return { status: 'UNAUTHORIZED', data: { message: this.invalid } };
    }
    const token = this.JWT.generate(email);
    return { status: 'SUCCESSFUL', data: { token } };
  };

  public getRole = async (token: string): Promise<ServiceResponse<{ role: string }>> => {
    const userEmail = this.JWT.decode(token);
    const dbUser = await this.userModel.findByEmail(userEmail);
    if (!dbUser) {
      return { status: 'UNAUTHORIZED', data: { message: this.invalid },
      };
    }
    return { status: 'SUCCESSFUL', data: { role: dbUser.role } };
  };
}
