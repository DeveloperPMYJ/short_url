import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './api/url.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UrlEntity } from './entities/url.entity';
import configuration from '../config/configuration';
import * as express from 'express';
import * as path from 'path';

const config_file = './config/configuration.ts';
console.log(config_file);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      envFilePath: '.env',
      load: [configuration],
      cache: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'shorten_url',
      entities: [UrlEntity],
      synchronize: true,
    }),
    UrlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
