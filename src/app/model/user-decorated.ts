import {User} from "./user";
import {UserInfoFromApi} from "./user-info-from-api";

export interface UserDecorated {
  user: User;
  userInfo?: UserInfoFromApi;
}
