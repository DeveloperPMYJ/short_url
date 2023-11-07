import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UrlRepo } from 'src/repositories/url.repository'

@Injectable()
export class UrlService {
    constructor(private urlRepo:UrlRepo) {} 
}