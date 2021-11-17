import CategoryTypegooseRepository from './categoryTypegooseRepository';
import CategoryTypeOrmRepository from './categoryTypeOrmRepository';

const getCategoryRepository = () => {
  if (process.env['DB'] === 'mongo') {
    return new CategoryTypegooseRepository();
  } else {
    return new CategoryTypeOrmRepository();
  }
};

export default getCategoryRepository;
