import { OrderListModel } from '../../mongoDB/models/orderList.model';
import mongoose from 'mongoose';
import { IOrderListProduct } from '../../../types/types';

class OrderListTypegooseRepository {
  async getOrderListId(userId: string) {
    const data = await OrderListModel.findOne({ where: { user_id: userId } }, '_id');
    return data ? data._id : null;
  }

  async createOrderList(userId: string) {
    const orderList = await OrderListModel.create({ user_id: new mongoose.Types.ObjectId(userId) });
    const data = await orderList.save();
    return data ? data._id : null;
  }

  async addProductsToOrderList<T>(orderListId: T, products: IOrderListProduct[]) {
    const productsToInsert = products.map((product) => {
      return { ...product, product_id: new mongoose.Types.ObjectId(product.product_id) };
    });
    const data = await OrderListModel.findByIdAndUpdate(
      { _id: orderListId },
      {
        $push: {
          products: productsToInsert
        }
      },
      { new: true, fields: 'products' }
    );
    return data ? { _id: orderListId, products } : null;
  }
}

export default OrderListTypegooseRepository;
