import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Payment extends Document {
  @Prop({ required: true })
  merchantId: string;

  @Prop({ required: true })
  cryptoAmount: number;

  @Prop({ required: true })
  fiatAmount: number;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  transactionId: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
