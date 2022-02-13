import { getModelForClass, mongoose, prop } from '@typegoose/typegoose';

export class LastRatingsClass {
  @prop({ required: true })
  public userId!: mongoose.Types.ObjectId;

  @prop({ required: true })
  public productId!: mongoose.Types.ObjectId;

  @prop({ required: true })
  public rating!: number;

  @prop({ required: false })
  public comment?: string;

  @prop({ required: true })
  public updatedAt!: Date;
}

export const LastRatingsModel = getModelForClass(LastRatingsClass);
