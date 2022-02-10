import { prop, getModelForClass, modelOptions, Severity, mongoose } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class ProductClass {
  @prop({ required: true, index: { unique: true } })
  public displayName!: string;

  @prop({ required: true })
  public createdAt!: Date;

  @prop({ required: true, ref: () => 'CategoryClass' })
  public categories!: mongoose.Types.ObjectId[];

  @prop({ required: true, index: true, default: 0 })
  public totalRating!: number;

  @prop({ required: true, index: true })
  public price!: number;

  @prop({ default: [] })
  public ratings!: Array<{ userId: ObjectId; rating: number; comment: string; updatedAt: Date }>;
}

export const ProductModel = getModelForClass(ProductClass);

/*
ProductModel.create({
  displayName: 'GTA',
  createdAt: new Date(),
  categories: ['61aca85674dc86f7ab57d789'],
  totalRating: 5,
  price: 65
});
ProductModel.create({
  displayName: 'Cyberpank 2077',
  createdAt: new Date(),
  categories: ['61aca85674dc86f7ab57d789'],
  totalRating: 4,
  price: 60
});
ProductModel.create({
  displayName: 'Fifa',
  createdAt: new Date(),
  categories: ['61aca85674dc86f7ab57d789'],
  totalRating: 3,
  price: 35
});
*/
