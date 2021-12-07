import { IProductFilterParamsParsed } from './../types/types';
import { MoreThanOrEqual, Between, LessThanOrEqual } from 'typeorm';
import { IProductSearchParams } from '../types/types';

const getParsedMinRating = (db: string | undefined, minRating: number) => {
  let parsedMinRatingParam;
  if (db === 'mongo') {
    parsedMinRatingParam = { $gte: minRating };
  } else if (db === 'postgres') {
    parsedMinRatingParam = MoreThanOrEqual(minRating);
  }
  return parsedMinRatingParam;
};

const getParsedPrice = (db: string | undefined, priceRange: string) => {
  let parsedPriceParam;
  const priceRangesSplitted = priceRange.split(':');
  if (db === 'mongo') {
    parsedPriceParam = {
      $gte: priceRangesSplitted[0] ? Number(priceRangesSplitted[0]) : 0,
      $lte: priceRangesSplitted[1] ? Number(priceRangesSplitted[1]) : Infinity
    };
  } else if (db === 'postgres') {
    if (priceRangesSplitted[0] && priceRangesSplitted[1]) {
      parsedPriceParam = Between(Number(priceRangesSplitted[0]), Number(priceRangesSplitted[1]));
    } else {
      if (priceRangesSplitted[0]) {
        parsedPriceParam = MoreThanOrEqual(Number(priceRangesSplitted[0]));
      }
      if (priceRangesSplitted[1]) {
        parsedPriceParam = LessThanOrEqual(Number(priceRangesSplitted[1]));
      }
    }
  }
  return parsedPriceParam;
};

export const parseProductQuerySearchParams = <T>(params: IProductSearchParams): IProductFilterParamsParsed<T> => {
  const { displayName, minRating, price, sortBy, page } = params;
  const db = process.env['DB'];
  const filterParsedParams: { [key: string]: unknown } = {};
  const sortingParsedParams: { [key: string]: 'ASC' | 'DESC' } = {};
  let skipParam = 0;

  if (displayName) {
    filterParsedParams['displayName'] = displayName;
  }
  if (minRating) {
    filterParsedParams['totalRating'] = getParsedMinRating(db, minRating);
  }

  if (price) {
    filterParsedParams['price'] = getParsedPrice(db, price);
  }

  if (sortBy) {
    const sortParamsSplitted = sortBy.split(':');
    if (sortParamsSplitted[0] && sortParamsSplitted[1]) {
      sortingParsedParams[sortParamsSplitted[0]] = sortParamsSplitted[1] === 'asc' ? 'ASC' : 'DESC';
    }
  }

  if (page) {
    const pageSize = process.env['PAGE_SIZE'];
    skipParam = (Number(page) - 1) * Number(pageSize);
  }

  return {
    filterParams: filterParsedParams,
    sortingParams: sortingParsedParams,
    skipParam
  };
};
