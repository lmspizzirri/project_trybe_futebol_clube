import { NextFunction, Request, Response } from 'express';

export default class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Preencha os campos' });
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Email ou senha inválido' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Email ou senha inválido' });
    }
    return next();
  }
}
