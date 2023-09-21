import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/IMatch';

export default class MatchService {
  constructor(
    private matchModel: MatchModel = new MatchModel(),
  ) {}

  public findAllMatches = async (): Promise<ServiceResponse<IMatch[]>> => {
    const allMatches = await this.matchModel.findAllMatches();
    return { status: 'SUCCESSFUL', data: allMatches };
  };

  public findFilteredMatches = async (inProgress: string): Promise<ServiceResponse<IMatch[]>> => {
    const filteredMatches = await this.matchModel.findFilteredMatches(inProgress);
    return { status: 'SUCCESSFUL', data: filteredMatches };
  };
}
