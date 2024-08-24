import {Card} from "./card";
import {User} from "./user";

enum GameStatus {
  IN_PROGRESS,
  COMPLETED

}
export enum GameDifficulty {

  EASY,
  MEDIUM,
  HARD

}


export interface Game {

  id:number,
  difficulty:GameDifficulty,
  gridSize:number,
  startTime:string,
  endTime:string,
  status:GameStatus,
  cards:Card[],
  user:User;


}
