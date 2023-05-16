import { Module } from '@nestjs/common';
// Module
import { BoardModule } from './apis/board/board.module';
// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BoardModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
