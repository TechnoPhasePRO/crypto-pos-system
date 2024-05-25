import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { Payment } from './schemas/payment.schema';
import { MerchantService } from '../merchant/merchant.service';
import { ExchangeService } from '../exchange/exchange.service';

@Injectable()
export class PaymentService {
  private readonly NOWPAYMENTS_API_KEY = process.env.NOW_PAYMENTS_API_KEY;

  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    private httpService: HttpService,
    private merchantService: MerchantService,
    private exchangeService: ExchangeService,
  ) {}

  async initiatePayment(merchantId: string, cryptoAmount: number): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpService.post('https://api.nowpayments.io/v1/payment', {
        price_amount: cryptoAmount,
        price_currency: 'BTC',
        pay_currency: 'BTC',
        ipn_callback_url: 'https://0855-103-68-22-224.ngrok-free.app/payment/confirm',
        order_id: 'orderId123',
        order_description: 'Order description',
      }, {
        headers: {
          'x-api-key': this.NOWPAYMENTS_API_KEY,
        },
      }));

      const payment = new this.paymentModel({
        merchantId,
        cryptoAmount,
        fiatAmount: 0,
        status: 'pending',
        transactionId: response.data.id,
      });

      await payment.save();
      return response.data;
    } catch (error) {
      console.error('An error occurred:', error.response?.data || error.message);
      this.handleError(error);
    }
  }

  async handlePaymentConfirmation(data: any): Promise<void> {
    const { paymentId } = data;

    const payment = await this.paymentModel.findById(paymentId);
    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }

    try {
      const fiatAmount = await this.exchangeService.convertCryptoToFiat(payment.cryptoAmount, 'BTC', 'USD');

      payment.fiatAmount = fiatAmount;
      payment.status = 'confirmed';
      await payment.save();

      await this.merchantService.updateAccountBalance(payment.merchantId, fiatAmount);
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: any) {
    console.error('An error occurred:', error.response?.data || error.message);
    throw new HttpException('Payment processing failed', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
