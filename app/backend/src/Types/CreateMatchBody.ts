export type CreateMatchBody = {
  id?: number,
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
};
