import { IUserRegistrationParams } from '../../../types/types';

class UserTypegooseRepository {
  async createUser(userData: IUserRegistrationParams) {
    return null;
  }

  async getUserByUsername(username: string) {
    return null;
  }
}

export default UserTypegooseRepository;
