import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Merchant } from './schemas/merchant.schema';

@Injectable()
export class MerchantService {
  constructor(@InjectModel(Merchant.name) private merchantModel: Model<Merchant>) {}

  async registerMerchant(name: string): Promise<Merchant> {
    const newMerchant = new this.merchantModel({ name, accountBalance: 0 });
    return newMerchant.save();
  }

  async getMerchant(id: string): Promise<Merchant> {
    return this.merchantModel.findById(id).exec();
  }

  async updateMerchantBalance(id: string, amount: number): Promise<Merchant> {
    const merchant = await this.getMerchant(id);
    merchant.accountBalance += amount;
    return merchant.save();
  }

  async updateAccountBalance(merchantId: string, amount: number): Promise<void> {
    const merchant = await this.merchantModel.findById(merchantId);
    if (!merchant) {
      throw new HttpException('Merchant not found', HttpStatus.NOT_FOUND);
    }

    merchant.accountBalance += amount;
    await merchant.save();
  }

}
