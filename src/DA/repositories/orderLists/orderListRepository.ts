import OrderListTypegooseRepository from './orderListsTypegooseRepository';
import OrderListTypeormRepository from './orderListsTypeormRepository';

const getOrderListRepository = () => {
  if (process.env['DB'] === 'mongo') {
    return new OrderListTypegooseRepository();
  } else {
    return new OrderListTypeormRepository();
  }
};

export default getOrderListRepository;
