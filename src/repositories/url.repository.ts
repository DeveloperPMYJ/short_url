// 데이터베이스 상호작용
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from 'src/entities/url.entity'
import { Repository } from 'typeorm'


@Injectable()
export class UrlRepo {
    constructor (
        @InjectRepository(UrlEntity)
        private urlRepo: Repository<UrlEntity>
    ) {}
        
}
