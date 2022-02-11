import LastRatingsTypegooseRepository from './lastRatingsTypegooseRepository';
import LastRatingsTypeormRepository from './lastRatingsTypeormRepository';

const getLastRatingsRepository = () => {
  if (process.env['DB'] === 'mongo') {
    return new LastRatingsTypegooseRepository();
  } else {
    return new LastRatingsTypeormRepository();
  }
};

export default getLastRatingsRepository;
