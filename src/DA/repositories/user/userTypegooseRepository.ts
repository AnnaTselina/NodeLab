import { IUserRegistrationParams, IUserUpdateProfileParams } from '../../../types/types';
import { UserModel } from '../../mongoDB/models/user.model';
import bcrypt from 'bcrypt';

class UserTypegooseRepository {
  async createUser(userData: IUserRegistrationParams) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = await UserModel.create({ ...userData, password: hashedPassword });
    const result = await newUser.save();

    return result ? result.username : null;
  }

  async getUserByUsername(username: string) {
    const result = await UserModel.findOne({ username });
    return result ? result : null;
  }

  async updateUserInfo(username: string, newUserInfo: IUserUpdateProfileParams) {
    const infoToBeUpdated: IUserUpdateProfileParams = {};

    if (newUserInfo.firstname) {
      infoToBeUpdated.firstname = newUserInfo.firstname;
    }
    if (newUserInfo.lastname) {
      infoToBeUpdated.lastname = newUserInfo.lastname;
    }

    const result = await UserModel.findOneAndUpdate(
      { username },
      { ...infoToBeUpdated },
      { new: true, fields: 'username firstname lastname' }
    );
    return result ? result : null;
  }

  async updateUserPassword(username: string, newPassword: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const result = await UserModel.findOneAndUpdate({ username }, { password: hashedPassword }, { new: true });
    return result ? true : false;
  }
}

export default UserTypegooseRepository;
