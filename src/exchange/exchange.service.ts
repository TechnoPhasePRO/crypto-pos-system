import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExchangeService {
  private readonly apiUrl = 'http://api.coinlayer.com';
  private readonly accessKey = process.env.COINLAYER_ACCESS_KEY;

  constructor(private httpService: HttpService) {}

  async getExchangeRate(crypto: string, fiat: string = 'USD'): Promise<number> {
    try {
      const response = await firstValueFrom(this.httpService.get(`${this.apiUrl}/live`, {
        params: {
          access_key: this.accessKey,
          target: fiat,
        },
      }));

      if (response.data && response.data.success) {
        const rate = response.data.rates[crypto.toUpperCase()];
        if (rate) {
          return rate;
        } else {
          throw new HttpException(`Rate for ${crypto} not found`, HttpStatus.NOT_FOUND);
        }
      } else {
        throw new HttpException('Failed to fetch exchange rate', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } catch (error) {
      console.error('An error occurred while fetching exchange rate:', error.message);
      throw new HttpException('Failed to fetch exchange rate', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async convertCryptoToFiat(amount: number, crypto: string, fiat: string): Promise<number> {
    try {
      const response = await firstValueFrom(this.httpService.get(`${this.apiUrl}/convert`, {
        params: {
          access_key: this.accessKey,
          from: crypto,
          to: fiat,
          amount,
        },
      }));

      if (response.data && response.data.success) {
        return response.data.result;
      } else {
        throw new HttpException('Conversion service failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } catch (error) {
      console.error('An error occurred while converting crypto to fiat:', error.message);
      throw new HttpException('Failed to convert crypto to fiat', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
