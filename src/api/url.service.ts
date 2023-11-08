import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UrlEntity } from 'src/entities/url.entity'
import { UrlRepo } from 'src/repositories/url.repository'



//short url 생성 
@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(UrlEntity)
        private urlRepo : Repository<UrlEntity>         // Entity class 지정
    ){}   

    async createShortUrl(originalUrl: string, userIp: string): Promise<string> {
        
        // short url 고유하게 만드는 로직  
        const shortUrl= generateUniqueShortUrl();
        
        // user ip 로 하루 short url 변환 횟수 확인 
        const today = new Date();
        today.setHours(0,0,0,0);
        const urlCount = await this.urlRepo                 // await = this.urlRepo 객체의 createQueryBuilder 메서드가 반환한 Promise를 대기하고 있음
            .createQueryBuilder('url')
            .where('url.userIp = :userIp', { userIp })
            .andWhere('url.createAt >= :today', { today }) 
            .getCount();                                    // 그 후에 getCount() 메서드를 호출하여 해당 카운트를 얻는다
        
        if (urlCount >= 30) {
            throw new NotFoundException('Short URL 변환 횟수가 제한을 초과하였습니다');
        }

        const UrlEntity = this.urlRepo.create({
            shortUrl,
            originalUrl,
            userIp
        });
        await this.urlRepo.save(UrlEntity);
        return shortUrl;
    }

    // "새로운 URL 리디렉션 api" server - redirect -> [service에서 originalUrl 호출] 
    async findOriginalUrlByShorten(shortUrl: string): Promise<string | undefined> {
        const urlEntity = await this.urlRepo.findOne({ where:{shortUrl: shortUrl}});   //  findOne 메서드를 사용할 때 해당 엔터티의 속성과 일치하는 조건을 전달해야 한다
        return urlEntity ? urlEntity.originalUrl : undefined;
    }
}


// 고유한 short url 생성하는 로직 
    function generateUniqueShortUrl(): string {
        return 'uniqueShortUrl';
}
// generateUniqueShortUrl 함수가 @Injectable() 데코레이터 아래에 포함되지 않는 이유
//서비스 클래스의 메소드가 아니며, 서비스 클래스가 아닌 독립적인 함수로 정의되었습니다. 이 함수는 서비스 클래스와 독립적으로 작동하고, 서비스 클래스에 직접 종속되지 않습니다




// Repository 패턴과 TypeORM과 같은 ORM(Object-Relational Mapping) 라이브러리를 사용하는 경우,
// Repository 클래스를 통해 데이터베이스와 상호작용하고 "쿼리 빌더"를 사용