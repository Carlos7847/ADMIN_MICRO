import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DATABASE;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbHost,
      port: 5432,
      username: dbUser,
      password: dbPass,
      database: dbName,
      // entities: [],
      autoLoadEntities: true,
      synchronize: true, // This is to sincronize database with entities. Just for development practice
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
