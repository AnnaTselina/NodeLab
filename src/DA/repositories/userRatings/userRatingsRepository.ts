import UserRatingsTypegooseRepository from './userRatingTypegooseRepository';
import UserRatingsTypeormRepository from './userRatingsTypeormRepository';

const getUserRatingsRepository = () => {
  if (process.env['DB'] === 'mongo') {
    return new UserRatingsTypegooseRepository();
  } else {
    return new UserRatingsTypeormRepository();
  }
};

export default getUserRatingsRepository;
