import { getModelForClass, prop } from '@typegoose/typegoose';

export class UserClass {
  @prop({ required: true })
  public username!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: false, default: null })
  public firstname?: string;

  @prop({ required: false, default: null })
  public lastname?: string;
}

export const UserModel = getModelForClass(UserClass);
