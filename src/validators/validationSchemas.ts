import { checkSchema } from 'express-validator';

const PRICE_REGEX = /^((0|[1-9]\d*)(\.\d+)?)?:((0|[1-9]\d*)(\.\d+)?)?$/;
const SORTBY_REGEX = /(displayName|price|totalRating|createdAt)+:(asc|desc)+/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const ROLE_BUYER = 'buyer';
const ROLE_ADMIN = 'admin';

export const validationProductsSchema = checkSchema(
  {
    displayName: {
      optional: true
    },
    minRating: {
      optional: true,
      isFloat: {
        options: { min: 0, max: 10 },
        errorMessage: `Value for 'minRating' must be a floating point number between 0 and 10.`
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

export const validationUserRegistrateSchema = checkSchema(
  {
    username: {
      exists: {
        errorMessage: 'Username must be provided.',
        bail: true
      },
      isEmail: {
        errorMessage: 'Valid email must be provided as username.'
      }
    },
    password: {
      exists: {
        errorMessage: 'Password must be provided.',
        bail: true
      },
      matches: {
        options: PASSWORD_REGEX,
        errorMessage:
          'Password must be at least 8 characters long, contain at least one lowercase and one uppercase letter, contain at least one special character.'
      }
    },
    firstname: {
      optional: true
    },
    lastname: {
      optional: true
    },
    role: {
      optional: true,
      custom: {
        options: (value) => {
          if (value === ROLE_BUYER || value === ROLE_ADMIN) {
            return true;
          } else {
            return false;
          }
        },
        errorMessage: `Accepted roles: '${ROLE_BUYER}', '${ROLE_ADMIN}'.`
      }
    }
  },
  ['body']
);

export const validationAuthenticationSchema = checkSchema(
  {
    username: {
      exists: {
        errorMessage: 'Username must be provided.',
        bail: true
      },
      isEmail: {
        errorMessage: 'Valid email must be provided as username.'
      }
    },
    password: {
      exists: {
        errorMessage: 'Password must be provided.'
      }
    }
  },
  ['body']
);

export const validationRefreshTokenSchema = checkSchema(
  {
    token: {
      exists: {
        errorMessage: 'Token must be provided.'
      }
    }
  },
  ['body']
);

export const validateUpdateUserInfoSchema = checkSchema(
  {
    firstname: {
      optional: true
    },
    lastname: {
      optional: true
    }
  },
  ['body']
);

export const validateUpdatePasswordSchema = checkSchema(
  {
    oldPassword: {
      exists: {
        errorMessage: 'Old password must be provided.'
      }
    },
    newPassword: {
      exists: {
        errorMessage: 'New password must be provided.'
      },
      matches: {
        options: PASSWORD_REGEX,
        errorMessage:
          'Password must be at least 8 characters long, contain at least one lowercase and one uppercase letter, contain at least one special character.'
      }
    }
  },
  ['body']
);

export const validateNewRatingSchema = checkSchema({
  rating: {
    exists: {
      errorMessage: 'Rating must be provided.',
      bail: true
    },
    isInt: {
      options: {
        min: 0,
        max: 10
      },
      errorMessage: 'Rating must be integer between 0 and 10.'
    }
  },
  comment: {
    optional: true
  }
});

export const validateOrderListProductsSchema = checkSchema(
  {
    products: {
      isArray: {
        options: {
          min: 1
        },
        errorMessage: `Products must be in not empty array under 'products' key.`
      }
    },
    'products.*.product_id': {
      exists: {
        errorMessage: 'Product information must include product_id.',
        bail: true
      }
    },
    'products.*.quantity': {
      exists: {
        errorMessage: 'Product information must include quantity.'
      },
      isInt: {
        errorMessage: 'Quantity must be integer.'
      }
    }
  },
  ['body']
);

export const validateOrderListIdSchema = checkSchema(
  {
    orderList_id: {
      exists: {
        errorMessage: 'Order list id must be provided.'
      }
    }
  },
  ['body']
);
