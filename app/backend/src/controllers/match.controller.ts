import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private matchService: MatchService) {}

  public findAllMatches = async (req: Request, res: Response) => {
    const matchStatus = req.query.inProgress as string;
    let matchData;
    if (matchStatus) { matchData = await this.matchService.findFilteredMatches(matchStatus); }
    matchData = await this.matchService.findAllMatches();
    return res.status(200).json(matchData.data);
  };
}
