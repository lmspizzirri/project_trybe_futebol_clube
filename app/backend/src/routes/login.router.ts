import { Request, Response, Router } from 'express';
import Validations from '../middewares/Validations';
import LoginController from '../controllers/login.controller';
import LoginService from '../services/login.service';
import UserModel from '../models/UserModel';
import JWT from '../utils/jwt';

const userModel = new UserModel();
const token = new JWT();
const userService = new LoginService(userModel, token);
const loginController = new LoginController(userService);

const router = Router();

router.post(
  '/',
  Validations.validateLogin,

  (req: Request, res: Response) => loginController.login(req, res),
);

export default router;
