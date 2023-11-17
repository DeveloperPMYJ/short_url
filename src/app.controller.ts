import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UrlService } from './api/url.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private urlService: UrlService)  {}

  // redirect api 
  @Get(':hash')       // create 시 (original post 시 프로토콜까지 https, http인지 알려줘야), get api : http://localhost:3000/a1VNq74h
  async redirectToOriginalUrl(
      @Param('hash') hash: string, 
      @Res() response) {
  const originalUrl = await this.urlService.findOriginalUrlByShorten(hash);
  response.redirect(302, originalUrl );
}


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// return url?originalUrl
// repo를 빼는 이유: transaction . 지금은 안 쓰니 그 목적이. 