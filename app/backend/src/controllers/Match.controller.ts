import { Request, Response } from 'express';
import MatchService from '../services/Match.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public findAllMatches = async (req: Request, res: Response) => {
    const matchStatus = req.query.inProgress as string;
    let matchData = null;
    if (matchStatus) {
      matchData = await this.matchService
        .findFilteredMatches(matchStatus);
    } else {
      matchData = await this.matchService.findAllMatches();
    }
    return res.status(mapStatusHTTP(matchData.status)).json(matchData.data);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, data } = await this.matchService.finishMatch(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this
      .matchService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public createMatch = async (req: Request, res: Response) => {
    const { status, data } = await this.matchService.createMatch(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  };
}
