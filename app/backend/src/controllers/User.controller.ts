import { Request, Response } from 'express';
import UserService from '../services/User.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(private userService: UserService) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { status, data } = await this.userService.login(email, password);
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public getRole = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const { status, data } = await this.userService.getRole(authorization);
    return res.status(mapStatusHTTP(status)).json(data);
  };
}
