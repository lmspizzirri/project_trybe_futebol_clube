import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public teamStats = async (req: Request, res: Response, isHomeTeam: boolean) => {
    const { status, data } = await this.leaderboardService.teamStats(isHomeTeam);
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public fullTeamStats = async (req: Request, res: Response) => {
    const { status, data } = await this.leaderboardService.fullTeamStats();
    return res.status(mapStatusHTTP(status)).json(data);
  };
}
