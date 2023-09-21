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

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, data } = await this.matchService.finishMatch(Number(id));
    if (status === 'NOT_FOUND') return res.status(404).json(data);
    return res.status(200).json(data);
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this
      .matchService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    if (status === 'NOT_FOUND') return res.status(404).json(data);
    return res.status(200).json(data);
  };

  public createMatch = async (req: Request, res: Response) => {
    const { status, data } = await this.matchService.finishMatch(req.body);
    if (status === 'NOT_FOUND') return res.status(404).json(data);
    return res.status(201).json(data);
  };
}
