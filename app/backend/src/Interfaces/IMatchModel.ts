import { IMatch } from './IMatch';

export default interface IMatchModel {
  findAllMatches(): Promise<IMatch[]>;
  findFilteredMatches(inProgress: string): Promise<IMatch[]>;
}
