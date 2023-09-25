import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/jwt';

const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/i;

export default class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const tokenValidation = new JWT();
    const tokenVerify = tokenValidation.verify(authorization);
    if (!tokenVerify) return res.status(401).json({ message: 'Token must be a valid token' });
    return next();
  }

  static validateUniqueTeam(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res
        .status(422).json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }
}
