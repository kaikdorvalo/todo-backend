import { Module } from '@nestjs/common';
import { taskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubTaskModule } from './subtask/subtask.module';

require('dotenv').config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: String(process.env.DB_PASSWORD),
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.js,.ts}'],
    logging: true,

  }), 
  taskModule, 
  SubTaskModule],
})
export class AppModule {}
