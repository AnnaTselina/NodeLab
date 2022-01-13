import { CategoryRepository } from '../DA/DBManager';
import HttpException from '../exceptions/exceptions';
import { ICategory } from '../types/types';

const checkCategoryIdsValid = async (categoryIdsToCheck: string[], categories?: ICategory[]) => {
  let categoriesExist;
  if (!categories) {
    categoriesExist = await CategoryRepository.getCategoriesById(categoryIdsToCheck);
  } else {
    categoriesExist = categories;
  }

  if (!categoriesExist) {
    throw new HttpException(500, 'An error occured trying to get categories.');
  }

  let categoryIdsFound = categoriesExist.map((category) => {
    if (process.env['DB'] === 'mongo') {
      return category._id?.toString();
    } else {
      return category._id;
    }
  });

  const categoryIdsNotExist = categoryIdsToCheck.filter((id) => !categoryIdsFound?.includes(id));

  if (categoryIdsNotExist.length) {
    throw new HttpException(404, `Categories with ids: '${categoryIdsNotExist.join(',')}' do not exist.`);
  }
};

export default checkCategoryIdsValid;
