import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initiate')
  async initiatePayment(@Body('merchantId') merchantId: string, @Body('cryptoAmount') cryptoAmount: number) {
    return this.paymentService.initiatePayment(merchantId, cryptoAmount);
  }

  @Post('confirmation')
  async handlePaymentConfirmation(@Body() data: any) {
    return this.paymentService.handlePaymentConfirmation(data);
  }

  @Post('confirm')
  async confirmPayment(@Body() data: any): Promise<void> {
    return this.paymentService.handlePaymentConfirmation(data);
  }
}
