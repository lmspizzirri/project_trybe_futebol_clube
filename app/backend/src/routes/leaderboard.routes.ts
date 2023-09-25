import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/home', (req: Request, res: Response) =>
  leaderboardController.teamStats(req, res, true));
router.get('/away', (req: Request, res: Response) =>
  leaderboardController.teamStats(req, res, false));
router.get('/', (req: Request, res: Response) =>
  leaderboardController.fullTeamStats(req, res));

export default router;
