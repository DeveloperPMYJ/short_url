import { Body, Controller, Get, Param, Post, Redirect, Res } from '@nestjs/common'
import { UrlService } from './url.service'
import { Response } from '@nestjs/common';

// "shorturl 생성 api" 
@Controller('shorten-url')                               // 컨트롤러 클래스 정의
export class UrlController {
    constructor(private urlService: UrlService) {}      //인스턴스: 클래스 / constructor:클래스의 생성자 메서드, UrlService & UrlRepo에 의존성 주입
    // UrlService 생성자 통해 주입 받음. 

    // short 생성 : original, short url, user IP 를 하나의 테이블에 저장
    @Post('create')
    async shortenUrl(@Body() data: {originalUrl: string, userIp: string}) {
        const {originalUrl, userIp} = data;  
        await this.urlService.createShortUrl(originalUrl, userIp)

        try {
        const shortUrl = await this.urlService.createShortUrl(originalUrl, userIp);
            return { shortUrl }; 
        } catch (error) {
            return {error: error.message}
        }
    } // shortenUrl 메서드에서,'UrlService'의 createShortUrl 메서드 호출 (shortUrl, await), return shorturl


    @Get(':shortUrl')
    @Redirect( )
    async redirectToOriginalUrl (
        @Param('shortUrl') shortUrl: string, 
        @Res() response: Response
        ) {
        const originalUrl = await this.urlService.findOriginalUrlByShorten(shortUrl);
        return { url: originalUrl || '/' };
    }
}



