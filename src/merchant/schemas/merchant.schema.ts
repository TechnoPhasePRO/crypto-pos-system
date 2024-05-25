import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Merchant extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  accountBalance: number;
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
