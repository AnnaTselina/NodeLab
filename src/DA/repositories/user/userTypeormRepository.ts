import { IUserRegistrationParams, IUserUpdateProfileParams } from '../../../types/types';
import { UserEntity } from '../../postgresql/entities/user.entity';
import bcrypt from 'bcrypt';

class UserTypeormRepository {
  async createUser(userData: IUserRegistrationParams) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const newUser = { ...userData, password: hashedPassword };

    const query = UserEntity.createQueryBuilder().insert().into('user').values([newUser]).returning('username');
    const result = await query.execute();

    return result ? result.raw[0].username : null;
  }

  async getUserByUsername(username: string) {
    const result = await UserEntity.createQueryBuilder('user').where({ username }).getOne();
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

    const result = await UserEntity.createQueryBuilder()
      .update('user')
      .set(infoToBeUpdated)
      .where('username = :username', { username })
      .returning('username, firstname, lastname')
      .execute();

    return result ? result.raw[0] : null;
  }

  async updateUserPassword(username: string, newPassword: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const result = await UserEntity.createQueryBuilder()
      .update('user')
      .set({ password: hashedPassword })
      .where('username = :username', { username })
      .execute();

    return result ? true : false;
  }
}

export default UserTypeormRepository;
