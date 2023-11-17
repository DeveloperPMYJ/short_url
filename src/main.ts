import { NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './http-exception.filter';
import { NestExpressApplication , ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';


  async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(express()));
    app.enableCors();     //프론트와 통신을 위한 cors 설정 
    app.useGlobalFilters(new HttpExceptionFilter());
    const configService = app.get (ConfigService)
    await app.listen(3000);
}
bootstrap();
