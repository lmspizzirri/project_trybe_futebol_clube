import { Router } from 'express';
import leaderboardRouter from './leaderboard.routes';
import matchRouter from './match.routes';
import teamsRouter from './teams.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
