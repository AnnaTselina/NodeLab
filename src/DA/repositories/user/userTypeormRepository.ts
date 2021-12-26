import { IUserRegistrationParams } from '../../../types/types';
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
}

export default UserTypeormRepository;
