import { prop, getModelForClass, mongoose } from '@typegoose/typegoose';

export class CategoryClass {
  @prop({ required: true })
  public displayName!: string;

  @prop({ required: true })
  public createdAt!: Date;

  @prop({
    ref: () => 'ProductClass',
    default: []
  })
  public products?: mongoose.Types.ObjectId[];
}

export const CategoryModel = getModelForClass(CategoryClass);

//CategoryModel.create({ displayName: 'PC', createdAt: new Date() });
//CategoryModel.create({ displayName: 'Xbox', createdAt: new Date() });
