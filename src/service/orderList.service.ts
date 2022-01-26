import { IOrderListProduct } from '../types/types';
import { OrderListRepository } from '../DA/DBManager';
import HttpException from '../exceptions/exceptions';
import checkProductIdsValid from '../helpers/productIdsValidation';

export class OrderListsService {
  public async createOrderList(userId: string, products: IOrderListProduct[]) {
    //check if user already has order list
    const orderListsExists = await OrderListRepository.getOrderListId(userId);
    if (orderListsExists) {
      throw new HttpException(400, 'Order list for user already exists.');
    }
    //check if provided product ids are valid
    const productsIds = products.map((product) => {
      return product.product_id;
    });
    await checkProductIdsValid(productsIds);

    const createOrderListResult = await OrderListRepository.createOrderList(userId);
    if (!createOrderListResult) {
      throw new HttpException(500, 'An error occured trying to create order list.');
    }

    const addProductsResult = await OrderListRepository.addProductsToOrderList(createOrderListResult, products);

    return addProductsResult;
  }

  public async updateOrderList(orderListId: string, products: IOrderListProduct[]) {
    //check if provided order list exists
    const orderListExists = await OrderListRepository.checkIfOrderListExists(orderListId);
    if (!orderListExists) {
      throw new HttpException(404, `Order list with provided id=${orderListId} does not exist.`);
    }
    //check if provided product ids are valid
    const productsIds = products.map((product) => {
      return product.product_id;
    });
    await checkProductIdsValid(productsIds);

    const orderListCleared = await OrderListRepository.clearOrderList(orderListId);
    if (!orderListCleared) {
      throw new HttpException(500, 'An error occured trying to update order list.');
    }

    const addProductsResult = await OrderListRepository.addProductsToOrderList(orderListId, products);

    return addProductsResult;
  }

  public async clearOrderList(orderListId: string) {
    //check if provided order list exists
    const orderListExists = await OrderListRepository.checkIfOrderListExists(orderListId);
    if (!orderListExists) {
      throw new HttpException(404, `Order list with provided id=${orderListId} does not exist.`);
    }

    const orderListCleared = await OrderListRepository.clearOrderList(orderListId);
    if (!orderListCleared) {
      throw new HttpException(500, 'An error occured trying to update order list.');
    }

    return orderListCleared;
  }
}
