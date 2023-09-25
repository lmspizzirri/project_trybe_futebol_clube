import { Request, Response, Router } from 'express';
import Validations from '../middewares/Validations';
import UserModel from '../models/UserModel';
import JWT from '../utils/jwt';
import UserController from '../controllers/User.controller';
import UserService from '../services/User.service';

const userModel = new UserModel();
const token = new JWT();
const userService = new UserService(userModel, token);
const userController = new UserController(userService);

const router = Router();

router.get(
  '/role',
  Validations.validateToken,
  (req:Request, res:Response) => userController.getRole(req, res),
);

router.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

export default router;
