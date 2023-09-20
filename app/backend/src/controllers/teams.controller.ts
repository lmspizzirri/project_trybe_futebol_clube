import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public findAllTeams = async (_req: Request, res: Response) => {
    const { data } = await this.teamService.findAllTeams();
    return res.status(200).json(data);
  };

  public findTeamById = async (req: Request, res: Response) => {
    const id = req.params;
    const { status, data } = await this.teamService.findTeamById(Number(id));
    if (status === 'SUCCESSFUL') return res.status(200).json(data);
    return res.status(404).json(data);
  };
}
