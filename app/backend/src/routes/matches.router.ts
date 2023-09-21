import { Request, Response, Router } from 'express';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';

const matchService = new MatchService();
const matchController = new MatchController(matchService);

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.findAllMatches(req, res));

export default router;
