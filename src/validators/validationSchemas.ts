import { checkSchema } from 'express-validator';

const PRICE_REGEX = /^((0|[1-9]\d*)(\.\d+)?)?:((0|[1-9]\d*)(\.\d+)?)?$/;
const SORTBY_REGEX = /(displayName|price|totalRating|createdAt)+:(asc|desc)+/;

export const validationProductsSchema = checkSchema(
  {
    displayName: {
      optional: true
    },
    minRating: {
      optional: true,
      isFloat: {
        options: { min: 0, max: 5 },
        errorMessage: `Value for 'minRating' must be a floating point number between 0 and 5.`
      }
    },
    price: {
      optional: true,
      matches: {
        options: PRICE_REGEX,
        errorMessage: `Value for 'price' must be in format 'x:y', where x and y are optional, positive (including 0), floating point numbers.`,
        bail: true
      },
      custom: {
        options: (value) => {
          const priceRangesSplitted = value.split(':');
          if (priceRangesSplitted[0] && priceRangesSplitted[1]) {
            return priceRangesSplitted[0] <= priceRangesSplitted[1];
          } else {
            return true;
          }
        },
        errorMessage: `Value for 'price' must be in format 'x:y', where x and y are optional and y >= x.`
      }
    },
    sortBy: {
      optional: true,
      custom: {
        options: (value) => SORTBY_REGEX.test(value),
        errorMessage: `Value for 'sortBy' must be in format 'x:y', where x can be 'displayName', 'price', 'totalRating', 'createdAt', y - 'asc', 'desc'.`
      }
    },
    page: {
      optional: true,
      isInt: {
        options: { min: 1 },
        errorMessage: 'Page must be full number higher from 0.'
      }
    }
  },
  ['params', 'query']
);

export const validationCategorySchema = checkSchema(
  {
    includeProducts: {
      optional: true,
      isBoolean: {
        errorMessage: `Value for 'includeProducts' must be boolean.`
      }
    },
    includeTop3Products: {
      optional: true,
      custom: {
        options: (value, { req }) => {
          if (req && req.query && req.query['includeProducts']) {
            return true;
          } else {
            return false;
          }
        },
        errorMessage: `Parameter 'includeTop3Products' must be followed by 'includeProducts' parameter.`,
        bail: true
      },
      equals: {
        options: 'top',
        errorMessage: `Values for 'includeTop3Products' can be: 'top'.`
      }
    }
  },
  ['params', 'query']
);
