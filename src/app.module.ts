import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Module({
  imports: [
//     SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, new DocumentBuilder()
//     .setTitle('Your API')
//     .setDescription('API description')
//     .setVersion('1.0')
//     .addTag('your-tag')
//     .build()
// ))    //  @nestjs/swagger
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


