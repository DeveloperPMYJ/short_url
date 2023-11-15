import { Injectable, NotFoundException, ForbiddenException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from 'src/entities/url.entity';
import { characters as alnum } from 'alnum';
import { Response } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { generateUniqueShortUrl } from 'src/utils/generate';

@Injectable()
export class UrlService {
    constructor(
    @InjectRepository(UrlEntity)
    private urlRepo: Repository<UrlEntity>, // Entity class 지정
    ) {}

  //1. short url 생성
    async createShortUrl(originalUrl: string, userIp: string): Promise<string> {
        // user ip 로 하루 short url 변환 횟수 확인
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 변환횟수 (urlCount)
        const urlCount = await this.urlRepo 
            .createQueryBuilder('url')
            .where('url.userIp = :userIp', { userIp }) 
            .andWhere('url.createdAt >= :today', { today })
            .getCount();                    

        // 변환 횟수 (urlCount) 30회 이상 -> throw NotFoundException (요청 제한)
        if (urlCount >= 30) {
            throw new ForbiddenException('Short URL 변환 횟수가 제한을 초과하였습니다');
        }

        // short url
        const baseUrl = 'http://localhost:3000/';
        const hash = generateUniqueShortUrl();   //뒷부분 난수
        const shortUrl = baseUrl + hash;

        //데이터베이스에 'hash ,originalUrl, userIp' 저장 (repo)
        await this.urlRepo
            .createQueryBuilder()
            .insert()
            .into(UrlEntity)
            .values({
                originalUrl: originalUrl,
                hash: hash,
                userIp: userIp,
            })
            .execute();

        return hash;     // Promise 가 있기에 return 해줘야 함
    }

  // 2. "새로운 URL 리디렉션 api" server - redirect -> [service에서 originalUrl 호출]

  //  "originalUrl 호출" shortUrl에 해당하는 UrlEntity를 데이터베이스에서 찾기
    async findOriginalUrlByShorten(hash: string): Promise<string | undefined> {    
        const urlEntity = await this.urlRepo.findOne({ where: { hash } }); 
    // console.log(urlEntity);
        return urlEntity ? urlEntity.originalUrl : undefined;
}

    async redirectUrl(
        @Res() res: Response,
        hash: string,
    ): Promise<void> {
    const originalUrl = await this.findOriginalUrlByShorten(hash);

        if (!originalUrl) {
        throw new NotFoundException(
        'Short URL에 해당되는 원본 URL을 찾을 수 없습니다',
        );
        }
    }
}  






// Repository 패턴과 TypeORM과 같은 ORM(Object-Relational Mapping) 라이브러리를 사용하는 경우,
// Repository 클래스를 통해 데이터베이스와 상호작용하고 "쿼리 빌더"를 사용 }
