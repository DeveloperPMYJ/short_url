import { Body, Controller, Post, Delete, Param, Res, HttpStatus, Req } from '@nestjs/common';
import { UrlService } from './url.service';
import { Request } from 'express';


@Controller('shorten-url')  
export class UrlController {
  constructor(private urlService: UrlService) {} 

  // short 생성 
  @Post('create')
  async shortenUrl(
    @Body() data: { originalUrl: string }, @Req () req : Request) {
    const userIp = req.ip    //프론트가 userIp를 주는게 아니라, Request에서 받아오는 거로. 
      const { originalUrl } = data;

    try {
      const shortUrl = await this.urlService.createShortUrl(
        originalUrl, userIp
      );
  
      return {shortUrl};    
      } catch (error) {
      return { error: error.message };
    }
  } 

  @Delete (':hash/delete')
  async deleteShortUrl(@Param ('hash') hash:string){
    await this.urlService.deleteShortUrl(hash)
    return { sucess: true }
  }
}