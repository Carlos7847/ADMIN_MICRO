import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(title: string, image: string): Promise<Product> {
    return this.productRepository.save({
      title,
      image,
    });
  }

  async getOne(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }
  //OPTION 2
  //   async getOne(id: number): Promise<Product> {
  //     const options: FindOneOptions<Product> = {
  //       where: {
  //         id: id,
  //       },
  //     };
  //     return this.productRepository.findOne(options);
  //   }

  async update(id: number, data): Promise<any> {
    return this.productRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    console.log(id, 'idaa');

    return this.productRepository.delete(id);
  }
}
