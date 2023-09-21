import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private loginService: LoginService) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { status, data } = await this.loginService.login(email, password);
    if (status === 'NOT_FOUND') return res.status(404).json(data);
    if (status === 'UNAUTHORIZED') return res.status(401).json(data);
    return res.status(200).json(data);
  };
}
