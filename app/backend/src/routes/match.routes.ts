import { Request, Response, Router } from 'express';
import MatchController from '../controllers/Match.controller';
import Validations from '../middewares/Validations';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.findAllMatches(req, res));
router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);
router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);
router.post(
  '/',
  Validations.validateToken,
  Validations.validateUniqueTeam,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default router;
