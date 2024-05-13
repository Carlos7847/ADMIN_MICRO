import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

const url_RMQ = process.env.URL_OPTION_RMQ;
const rmq_name = process.env.RMQ_NAME;
const queue = process.env.RMQ_QUEUE;

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: rmq_name,
        transport: Transport.RMQ,
        options: {
          urls: [url_RMQ],
          queue: queue,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
