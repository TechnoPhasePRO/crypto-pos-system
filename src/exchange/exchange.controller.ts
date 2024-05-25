import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get('rate')
  async getExchangeRate(@Query('crypto') crypto: string, @Query('fiat') fiat: string): Promise<any> {
    try {
      if (!crypto || !fiat) {
        throw new HttpException('Crypto and fiat currencies must be specified', HttpStatus.BAD_REQUEST);
      }
      const rate = await this.exchangeService.getExchangeRate(crypto, fiat);
      return { rate };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('convert')
  async convertCryptoToFiat(@Query('amount') amount: number, @Query('crypto') crypto: string, @Query('fiat') fiat: string): Promise<any> {
    try {
      if (!amount || !crypto || !fiat) {
        throw new HttpException('Amount, crypto, and fiat currencies must be specified', HttpStatus.BAD_REQUEST);
      }
      const convertedAmount = await this.exchangeService.convertCryptoToFiat(amount, crypto, fiat);
      return { convertedAmount };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
