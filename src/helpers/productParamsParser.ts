import { MoreThanOrEqual, Between, LessThanOrEqual } from 'typeorm';
import { IProductSearchParams, IProductFilterParamsMongo, IProductFilterParamsPostgres } from '../types/types';

export const parseProductQueryParamsMongo = (params: IProductSearchParams) => {
  const { displayName, minRating, price, sortBy } = params;
  const filterParams: IProductFilterParamsMongo = {};
  const sortingParams: { [index: string]: number } = {};

  if (displayName) {
    filterParams['displayName'] = displayName;
  }

  if (minRating) {
    filterParams['totalRating'] = { $gte: minRating };
  }

  if (price) {
    const priceRangesSplitted = price.split(':');
    filterParams['price'] = {
      $gte: priceRangesSplitted[0] ? Number(priceRangesSplitted[0]) : 0,
      $lte: priceRangesSplitted[1] ? Number(priceRangesSplitted[1]) : Infinity
    };
  }

  if (sortBy) {
    const sortParamsSplitted = sortBy.split(':');
    if (sortParamsSplitted[0] && sortParamsSplitted[1]) {
      sortingParams[sortParamsSplitted[0]] = sortParamsSplitted[1] === 'asc' ? 1 : 0;
    }
  }

  return { filterParams, sortingParams };
};

export const parseProductQueryParamsPostgres = (params: IProductSearchParams) => {
  const { displayName, minRating, price, sortBy } = params;
  const filterParams: IProductFilterParamsPostgres = {};
  const sortingParams: { [index: string]: string } = {};

  if (displayName) {
    filterParams['displayName'] = displayName;
  }

  if (minRating) {
    filterParams['totalRating'] = MoreThanOrEqual(params.minRating);
  }

  if (price) {
    const priceRangesSplitted = price.split(':');

    if (priceRangesSplitted[0] && priceRangesSplitted[1]) {
      filterParams['price'] = Between(Number(priceRangesSplitted[0]), Number(priceRangesSplitted[1]));
    } else {
      if (priceRangesSplitted[0]) {
        filterParams['price'] = MoreThanOrEqual(Number(priceRangesSplitted[0]));
      }
      if (priceRangesSplitted[1]) {
        filterParams['price'] = LessThanOrEqual(Number(priceRangesSplitted[1]));
      }
    }
  }

  if (sortBy) {
    const sortParamsSplitted = sortBy.split(':');
    if (sortParamsSplitted[0] && sortParamsSplitted[1]) {
      sortingParams[sortParamsSplitted[0]] = sortParamsSplitted[1] === 'asc' ? 'ASC' : 'DESC';
    }
  }

  return { filterParams, sortingParams };
};
