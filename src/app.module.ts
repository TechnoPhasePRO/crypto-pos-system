import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './payment/payment.module';
import { MerchantModule } from './merchant/merchant.module';
import { ExchangeModule } from './exchange/exchange.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    PaymentModule,
    MerchantModule,
    ExchangeModule,
  ],
})
export class AppModule {}
