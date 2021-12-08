import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { ProductClass } from './product.model';
export class CategoryClass {
  @prop({ required: true })
  public displayName!: string;

  @prop({ required: true })
  public createdAt!: Date;

  @prop({
    ref: () => 'ProductClass',
    default: []
  })
  public products?: Ref<ProductClass>[];
}

export const CategoryModel = getModelForClass(CategoryClass);

//CategoryModel.create({ displayName: 'PC', createdAt: new Date() });
//CategoryModel.create({ displayName: 'Xbox', createdAt: new Date() });
