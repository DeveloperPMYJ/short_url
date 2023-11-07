import { Body, Controller, } from '@nestjs/common'
import { Response } from 'express'
import { UrlService } from './url.service'

@Controller('url') // 컨트롤러 클래스 정의 
export class UrlController {
    constructor(private urlService: UrlService){} 
}  //constructor:클래스의 생성자 메서드, UrlService & UrlRepo에 의존성 주입 


