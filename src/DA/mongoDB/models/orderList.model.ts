import { getModelForClass, prop, modelOptions, Severity } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class OrderlistClass {
  @prop({ required: true })
  public user_id!: ObjectId;

  @prop({ required: true })
  public products!: Array<{ product_id: ObjectId; quantity: number }>;
}

export const OrderListModel = getModelForClass(OrderlistClass);
