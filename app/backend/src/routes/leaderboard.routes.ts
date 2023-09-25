import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/home', (req: Request, res: Response) => leaderboardController.homeTeamStats(req, res));

export default router;
