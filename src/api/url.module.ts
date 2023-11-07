import { Module } from '@nestjs/common';
import { UrlController } from './url.controller'
import { UrlService } from './url.service';
import { UrlRepo } from '../repositories/url.repository';

@Module({
    imports: [],
    controllers: [UrlController],
    providers: [UrlRepo, UrlService],
})
export class UrlModule {}
