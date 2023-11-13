import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from 'src/entities/url.entity';
import { characters as alnum } from 'alnum';
import { Response } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private urlRepo: Repository<UrlEntity>, // Entity class 지정
  ) {}

  //short url 생성
  async createShortUrl(originalUrl: string, userIp: string): Promise<string> {
    // 1. user ip 로 하루 short url 변환 횟수 확인
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    //     // 변환횟수 (urlCount)
    // const urlCount = await this.urlRepo // a) await = this.urlRepo 객체의 createQueryBuilder 메서드가 반환한 Promise를 대기하고 있음
    //     .createQueryBuilder('url')
    //     .where('url.userIp = :userIp', { userIp }) // userIp로 하루 short URL 변환 횟수 확인
    //     .andWhere('url.createdAt >= :today', { today })
    //     .getCount();                        // b) 그 후에 getCount() 메서드를 호출하여 해당 카운트를 얻는다

    //     // 변환 횟수 (urlCount) 30회 이상 -> throw NotFoundException (요청 제한)
    // if (urlCount >= 30) {
    //     throw new NotFoundException('Short URL 변환 횟수가 제한을 초과하였습니다');
    // }

    // 2. short url
    const baseUrl = 'http://localhost:3000/';
    const newUrl = generateUniqueShortUrl();
    const shortUrl = baseUrl + newUrl;

    console.log(shortUrl);

    //데이터베이스에 'shortUrl,originalUrl, userIp' 저장 (repo)
    await this.urlRepo
      .createQueryBuilder()
      .insert()
      .into(UrlEntity)
      .values({
        originalUrl: originalUrl,
        shortUrl: shortUrl,
        userIp: userIp,
      })
      .execute();

    return shortUrl;
  }

  // 2. "새로운 URL 리디렉션 api" server - redirect -> [service에서 originalUrl 호출]

  //  "originalUrl 호출" shortUrl에 해당하는 UrlEntity를 데이터베이스에서 찾기
  async findOriginalUrlByShorten(
    shortUrl: string,
  ): Promise<string | undefined> {
    console.log(shortUrl);
    const urlEntity = await this.urlRepo.findOne({
      where: { shortUrl },
    }); //  findOne 메서드를 사용할 때 해당 엔터티의 속성과 일치하는 조건을 전달해야 한다
    console.log(urlEntity);
    return urlEntity ? urlEntity.originalUrl : undefined;
  }

  async redirectByShortUrl(
    @Res() res: Response,
    shortUrl: string,
  ): Promise<void> {
    const originalUrl = await this.findOriginalUrlByShorten(shortUrl);

    if (!originalUrl) {
      throw new NotFoundException(
        'Short URL에 해당되는 원본 URL을 찾을 수 없습니다',
      );
    }
  }
}

// 고유한 short url
// alnum 없이 하는 방법
function generateUniqueShortUrl(): string {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 8; // 길이가 8인 문자열, 영문 대소문자, 숫자 사용
  let uniqueShortUrl = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueShortUrl += characters.charAt(randomIndex);
  }

  return uniqueShortUrl;
}

// Repository 패턴과 TypeORM과 같은 ORM(Object-Relational Mapping) 라이브러리를 사용하는 경우,
// Repository 클래스를 통해 데이터베이스와 상호작용하고 "쿼리 빌더"를 사용 }
