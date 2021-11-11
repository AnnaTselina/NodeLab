import { prop, getModelForClass } from '@typegoose/typegoose';

class CategoryClass {
  @prop({ required: true })
  public displayName!: string;

  @prop({ required: true })
  public createdAt!: Date;
}

const CategoryModel = getModelForClass(CategoryClass);

//CategoryModel.create({ displayName: 'PC', createdAt: new Date() });
//CategoryModel.create({ displayName: 'Xbox', createdAt: new Date() });

export default CategoryModel;
