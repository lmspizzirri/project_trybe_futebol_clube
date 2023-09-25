import ILeaderBoard from '../Interfaces/ILeaderBoard';
import ILeaderBoardAux from '../Interfaces/ILeaderBoardAux';
import { IMatch } from '../Interfaces/IMatch';

const leaderBoard: ILeaderBoard = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

function totalPoints(homeTeams: IMatch[], filledLeaderBoard: ILeaderBoard, isHomeTeam: boolean) {
  const board = { ...filledLeaderBoard };
  homeTeams.forEach((match) => {
    board.totalGames += 1;
    const goalsFavor = isHomeTeam ? match.homeTeamGoals : match.awayTeamGoals;
    const goalsOwn = isHomeTeam ? match.awayTeamGoals : match.homeTeamGoals;
    board.goalsFavor += goalsFavor;
    board.goalsOwn += goalsOwn;
    if (goalsFavor > goalsOwn) {
      board.totalPoints += 3;
      board.totalVictories += 1;
    }
    if (goalsFavor < goalsOwn) board.totalLosses += 1;
    if (goalsFavor === goalsOwn) {
      board.totalPoints += 1;
      board.totalDraws += 1;
    }
  });
  return board;
}

function sortLeaderboard(leaderBoards: ILeaderBoard[]): ILeaderBoard[] {
  return leaderBoards.sort((a, b) => {
    let winner = b.totalPoints - a.totalPoints;
    if (winner === 0) {
      winner = b.totalVictories - a.totalVictories;
      if (winner === 0) {
        winner = b.goalsBalance - a.goalsBalance;
        if (winner === 0) {
          winner = b.goalsFavor - a.goalsFavor;
        }
      }
    }
    return winner;
  });
}

export function teamStatistics(
  teamsStats: ILeaderBoardAux[],
  isHomeTeam: boolean,
): ILeaderBoard[] {
  return sortLeaderboard(teamsStats.map((team) => {
    let board = { ...leaderBoard };
    board.name = team.teamName;
    board = { ...totalPoints(
      isHomeTeam
        ? team.homeTeamMatches
        : team.awayTeamMatches,
      board,
      isHomeTeam,
    ) };
    board.goalsBalance = board.goalsFavor - board.goalsOwn;
    board.efficiency = ((board.totalPoints
        / (board.totalGames * 3)) * 100);
    return board;
  }));
}

export function fullTeamStatistics(
  teamsStats: ILeaderBoardAux[],
): ILeaderBoard[] {
  return sortLeaderboard(teamsStats.map((team) => {
    let board = { ...leaderBoard };
    board.name = team.teamName;
    board = { ...totalPoints(team.homeTeamMatches, board, true) };
    board = { ...totalPoints(team.awayTeamMatches, board, false) };
    board.goalsBalance = board.goalsFavor - board.goalsOwn;
    board.efficiency = ((board.totalPoints
        / (board.totalGames * 3)) * 100);
    return board;
  }));
}
