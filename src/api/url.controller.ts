import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common'
import { Response } from 'express'
import { UrlService } from './url.service'

// "shorturl 생성 api" 
@Controller('shorten-url')                               // 컨트롤러 클래스 정의
export class UrlController {
    constructor(private urlService: UrlService) {}      //인스턴스: 클래스 / constructor:클래스의 생성자 메서드, UrlService & UrlRepo에 의존성 주입


    // short 생성 : original, short url, user IP 를 하나의 테이블에 저장
    @Post()
    async shortenUrl(@Body() data: {originalUrl: string, userIp: string}) {
        const { originalUrl, userIp } = data; 
        const shrotUrl = await this.urlService.createShortUrl(originalUrl, userIp);
        return { shrotUrl }; 
    }
}


// "새로운 URL 리디렉션 api" server - redirect
@Controller() 
export class UrlRedirectController {
    constructor(private readonly urlService: UrlService) {}

    @Get(':shortUrl')
    @Redirect('', 301)
    async Redirect(@Param('shortUrl') shortUrl: string){
        const originalUrl = await this.urlService.findOriginalUrlByShorten(shortUrl);
        return { url: originalUrl || '/' };
    }
}



