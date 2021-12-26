import { getModelForClass, prop } from '@typegoose/typegoose';

export class UserClass {
  @prop({ required: true })
  public username!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: false })
  public firstname?: string;

  @prop({ required: false })
  public lastname?: string;
}

export const UserModel = getModelForClass(UserClass);
