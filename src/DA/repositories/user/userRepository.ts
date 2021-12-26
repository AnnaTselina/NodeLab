import UserTypegooseRepository from './userTypegooseRepository';
import UserTypeormRepository from './userTypeormRepository';

const getUserRepository = () => {
  if (process.env['DB'] === 'mongo') {
    return new UserTypegooseRepository();
  } else {
    return new UserTypeormRepository();
  }
};

export default getUserRepository;
