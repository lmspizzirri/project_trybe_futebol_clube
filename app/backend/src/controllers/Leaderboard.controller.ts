import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public homeTeamStats = async (req: Request, res: Response) => {
    const { status, data } = await this.leaderboardService.homeTeamStats();
    return res.status(mapStatusHTTP(status)).json(data);
  };
}