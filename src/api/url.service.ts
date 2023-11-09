import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UrlEntity } from 'src/entities/url.entity'
import { UrlRepo } from 'src/repositories/url.repository'
import { characters as alnum } from 'alnum';
import { resourceUsage } from 'process'



@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(UrlEntity)
        private urlRepo : Repository<UrlEntity>         // Entity class 지정
    ){}   
    
    //1. short url 생성 
    async createShortUrl(originalUrl: string, userIp: string): Promise<string> {
        
        // localhost:3000/ 뒤에 위치하는 shorturl
        const baseUrl = 'http://localhost:3000'; // 기본 Url
        const shortUrl = generateUniqueShortUrl(length);    // 1-1. short url 고유하게 만드는 로직  (중복되지 않는 short url)
        const fullShortUrl = baseUrl + shortUrl; 

        // 1-2. user ip 로 하루 short url 변환 횟수 확인 
        const today = new Date();
        today.setHours(0,0,0,0);
        const urlCount = await this.urlRepo                            // a) await = this.urlRepo 객체의 createQueryBuilder 메서드가 반환한 Promise를 대기하고 있음
            .createQueryBuilder('url')
            .where('url.userIp = :userIp', { userIp })     // userIp로 하루 short URL 변환 횟수 확인
            .andWhere('url.createAt >= :today', { today }) 
            .getCount();                                              // b) 그 후에 getCount() 메서드를 호출하여 해당 카운트를 얻는다
        
            // 변환 횟수 30회 이상 -> throw NotFoundException (요청 제한) 
        if (urlCount >= 30) {   
            throw new NotFoundException('Short URL 변환 횟수가 제한을 초과하였습니다');
        }

        // UrlEntity 생성, 데이터베이스에 저장 (repo)
        const UrlEntity = this.urlRepo.create({   // TypeORM의 Repository 이용해서 UrlEntity 생성 (create)
            shortUrl,
            originalUrl,
            userIp
        });
        await this.urlRepo.save(UrlEntity);      // 생성된 UrlEntity를 데이터베이스에 저장 (save)
        return shortUrl;

        
    }

    // 2. "새로운 URL 리디렉션 api" server - redirect -> [service에서 originalUrl 호출] 
    async findOriginalUrlByShorten(shortUrl: string): Promise<string | undefined> {
        const urlEntity = await this.urlRepo.findOne({ where:{shortUrl: shortUrl}});   //  findOne 메서드를 사용할 때 해당 엔터티의 속성과 일치하는 조건을 전달해야 한다
        return urlEntity ? urlEntity.originalUrl : undefined;
    }
}

// generateUniqueShortUrl 함수가 @Injectable() 데코레이터 아래에 포함되지 않는 이유: 서비스 클래스의 메소드가 아니며, 서비스 클래스가 아닌 독립적인 함수 -> 서비스 클래스와 독립적으로 작동, 서비스 클래스에 직접 종속 x
// 1-1. 고유한 short url 생성하는 로직 (중복되지 않는 short url)

    // alnum을 사용하는 방법 -> 위에서 import { } from alnum, npm install alnum  
    function generateUniqueShortUrl(length: number): string {
        let result = '';
        const charactersLength = alnum.length;

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random () * charactersLength);
            result += alnum.charAt(randomIndex);
        }
        
        return result
    }

// //alnum 사용 없이 하는 방법 
//     function generateUniqueShortUrl(): string {
//         const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//         const length = 8;               // 길이가 8인 문자열, 영문 대소문자, 숫자 사용
//         let uniqueShortUrl = '';

//         for (let i = 0; i < length; i++) {
//             const randomIndex = Math.floor(Math.random() * characters.length);
//             uniqueShortUrl += characters.charAt(randomIndex);
//         }

//         return 'uniqueShortUrl';
// }



// Repository 패턴과 TypeORM과 같은 ORM(Object-Relational Mapping) 라이브러리를 사용하는 경우,
// Repository 클래스를 통해 데이터베이스와 상호작용하고 "쿼리 빌더"를 사용