import { Body, Controller, Post, Res } from '@nestjs/common';
import { UrlService } from './url.service';


@Controller('shorten-url')  
export class UrlController {
  constructor(private urlService: UrlService) {} 

  // short 생성 
  @Post('create')
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
  } 
}
