import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from 'src/entities/url.entity';
import { UrlRepo } from '../repositories/url.repository';
import { UrlController } from './url.controller'
import { UrlService } from './url.service';




@Module({
    imports: [TypeOrmModule.forFeature([UrlEntity, UrlRepo])],
    controllers: [UrlController],
    providers: [UrlService],
})
export class UrlModule {}