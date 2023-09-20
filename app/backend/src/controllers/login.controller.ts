import { Request, Response } from 'express';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) {}

  public login = async (_req: Request, res: Response) => {
    const { status, data } = await this.loginService.login();
    return res.status(status).json(data);
  };
}
