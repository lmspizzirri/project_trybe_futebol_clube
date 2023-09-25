import { IMatch } from '../Interfaces/IMatch';
import ILeaderBoard from '../Interfaces/ILeaderBoard';
import ILeaderBoardAux from '../Interfaces/ILeaderBoardAux';

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

function totalPoints(homeTeams: IMatch[], filledLeaderBoard: ILeaderBoard) {
  const homeLeaderBoard = { ...filledLeaderBoard };
  homeTeams.forEach((match) => {
    homeLeaderBoard.totalGames += 1;
    homeLeaderBoard.goalsFavor += match.homeTeamGoals;
    homeLeaderBoard.goalsOwn += match.awayTeamGoals;
    if (match.homeTeamGoals > match.awayTeamGoals) {
      homeLeaderBoard.totalPoints += 3;
      homeLeaderBoard.totalVictories += 1;
    }
    if (match.homeTeamGoals < match.awayTeamGoals) {
      homeLeaderBoard.totalLosses += 1;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      homeLeaderBoard.totalPoints += 1;
      homeLeaderBoard.totalDraws += 1;
    }
  });
  return homeLeaderBoard;
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

export default function homeTeamStatistics(homeTeams: ILeaderBoardAux[]): ILeaderBoard[] {
  return sortLeaderboard(homeTeams.map((team) => {
    let homeLeaderBoard = { ...leaderBoard };
    homeLeaderBoard.name = team.teamName;
    homeLeaderBoard = { ...totalPoints(team.homeTeamMatches, homeLeaderBoard) };
    homeLeaderBoard.goalsBalance = homeLeaderBoard.goalsFavor - homeLeaderBoard.goalsOwn;
    homeLeaderBoard.efficiency = ((homeLeaderBoard.totalPoints
        / (homeLeaderBoard.totalGames * 3)) * 100);
    return homeLeaderBoard;
  }));
}
