import {Game} from "./game";

export interface Card{

  id :number,
  value:string,
  isFlipped: boolean,
  game: Game;


}
