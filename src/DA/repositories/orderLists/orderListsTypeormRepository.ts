import { OrderListEntity } from '../../postgresql/entities/orderList.entity';
import { IOrderListProduct } from '../../../types/types';
import { OrderListProductsEntity } from '../../postgresql/entities/orderListProducts.entity';

class OrderListTypeormRepository {
  async getOrderListId(userId: string) {
    const data = await OrderListEntity.createQueryBuilder('order_list').where({ user: userId }).getOne();
    return data ? data._id : null;
  }

  async createOrderList(userId: string) {
    const data = await OrderListEntity.createQueryBuilder()
      .insert()
      .into('order_list')
      .values([{ user: userId }])
      .returning('_id')
      .execute();

    return data ? data.raw[0]._id : null;
  }

  async addProductsToOrderList<T>(orderListId: T, products: IOrderListProduct[]) {
    const insertData = products.map((product) => {
      return { ...product, order_list: orderListId, product: product.product_id };
    });
    const result = await OrderListProductsEntity.createQueryBuilder()
      .insert()
      .into('order_list_products')
      .values(insertData)
      .execute();

    return result ? { _id: orderListId, products } : null;
  }
}

export default OrderListTypeormRepository;
