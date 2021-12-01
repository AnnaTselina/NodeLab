import mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';

class ProductClass {
  @prop({ required: true, index: { unique: true } })
  public displayName!: string;

  @prop({ required: true })
  public createdAt!: Date;

  @prop({ required: true })
  public categoryId!: mongoose.Schema.Types.ObjectId;

  @prop({ required: true, index: true })
  public totalRating!: number;

  @prop({ required: true, index: true })
  public price!: number;
}

const ProductModel = getModelForClass(ProductClass);

/*
ProductModel.create({
  displayName: 'GTA',
  createdAt: new Date(),
  categoryId: '61843d4e4b7dfffb9e7439ff',
  totalRating: 5,
  price: 65
});
ProductModel.create({
  displayName: 'Cyberpank 2077',
  createdAt: new Date(),
  categoryId: '61843d4e4b7dfffb9e7439ff',
  totalRating: 4,
  price: 60
});
ProductModel.create({
  displayName: 'Fifa',
  createdAt: new Date(),
  categoryId: '61843c09f49e143f42495a08',
  totalRating: 3,
  price: 35
});*/

export default ProductModel;
