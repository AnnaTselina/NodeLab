import { getModelForClass, mongoose, prop, modelOptions, Severity } from '@typegoose/typegoose';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class OrderlistClass {
  @prop({ required: true })
  public user_id!: mongoose.Types.ObjectId;

  @prop({ required: true })
  public products!: Array<{ product_id: mongoose.Types.ObjectId; quantity: number }>;
}

export const OrderListModel = getModelForClass(OrderlistClass);
