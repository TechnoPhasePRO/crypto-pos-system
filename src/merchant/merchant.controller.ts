import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { MerchantService } from './merchant.service';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post('register')
  async registerMerchant(@Body('name') name: string) {
    return this.merchantService.registerMerchant(name);
  }

  @Get(':id')
  async getMerchant(@Param('id') id: string) {
    return this.merchantService.getMerchant(id);
  }

  @Put(':id/balance')
  async updateMerchantBalance(@Param('id') id: string, @Body('amount') amount: number) {
    return this.merchantService.updateMerchantBalance(id, amount);
  }
}
