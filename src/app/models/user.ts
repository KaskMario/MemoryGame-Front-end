import {Role} from "./role";
import {Game} from "./game";

export interface User {
  id: number,
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  games:Game[],
  role: Role;


}
