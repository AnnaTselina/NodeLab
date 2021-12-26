import { UserRepository } from '../DA/DBManager';
import { IUserRegistrationParams, IUserUpdateProfileParams } from '../types/types';

export class UserService {
  public async createUser(userData: IUserRegistrationParams) {
    const data = await UserRepository.createUser(userData);
    return data;
  }

  public async getUserByUsername(username: string) {
    const data = await UserRepository.getUserByUsername(username);
    return data;
  }

  public async updateUserInfo(username: string, newUserInfo: IUserUpdateProfileParams) {
    const data = await UserRepository.updateUserInfo(username, newUserInfo);
    return data;
  }
}
