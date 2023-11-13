import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UrlService } from './url.service';

// "shorturl 생성 api"
@Controller()  
export class UrlController {
  constructor(private urlService: UrlService) {} 

  @Get(':hash')       // create 시 (original post 시 프로토콜까지 https, http인지 알려줘야), get api : http://localhost:3000/a1VNq74h
  async redirectToOriginalUrl(
      @Param('hash') hash: string, 
      @Res() response) {
  const originalUrl = await this.urlService.findOriginalUrlByShorten(hash);
  response.redirect(302, originalUrl );
}

  // short 생성 : original, short url, user IP 를 하나의 테이블에 저장
  @Post('shorten-url/create')
  async shortenUrl(@Body() data: { originalUrl: string; userIp: string }) {
    const { originalUrl, userIp } = data;

    try {
      const shortUrl = await this.urlService.createShortUrl(
        originalUrl,
        userIp,
      );
      return { shortUrl };
    } catch (error) {
      return { error: error.message };
    }
  } // shortenUrl 메서드에서,'UrlService'의 createShortUrl 메서드 호출 (shortUrl, await), return shorturl
}
