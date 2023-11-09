### short url 생성 기능 : 구조 만들기, 데이터베이스 설계 및 구축
## for 문을 활용한 임의의 문자열 알고리즘 
### URL 단축 서비스의 활용 

어느 서비스에서나 쓰일 수 있는 url 주소 단축 기능은, 주로 주소 복사 및 공유할 때 쓰인다. 불필요하게 긴 주소는 공유할 때 번거롭기 때문이다. 이번 프로젝트에서는 단순 기능개발에 목적을 두기보다, 구조화와 개발 환경 구축에 초점을 맞추었다.

### 백엔드 작업

1. 구조화: 코드 중복을 최소화하기 위해 서비스 클래스를 구조화 / ‘NestJS Exception Filter’
2. DB 만들기 = entity, table 등
3. 초기세팅 (nestJs, typescript, typeorm, ormconfig.js) : nest cli 
4. short url 생성 api 만들기

## 플로우

### 1) short url 생성

- **original url, user ip 를 서버에 전송** (POST)
- 서버에서 **short url 생성** 
    
    1) localhost:3000/ 뒤에 위치하는 shorturl (const fullShortUrl = baseUrl + shortUrl; )
    2) short url 고유하게 만드는 로직: (도메인 부분을 제외한) 뒷부분’ 절대 중복되지 않도록 (영문 대소문자, 가끔 하나의 숫자)
    
    3)  user ip로 하루 short URL 변환 횟수 확인: 저장한 ip 주소 - 일 30회만 변환 가능하게 작업 
    
- **DB에 데이터 저장:** original url , short url, user IP (insert into)
- short url 반환 (return)

### 2) short url로 접속

********DB에서 원래 주소를 찾은 후 Redirect :******** 서버에서 - 뒷부분 조회 (select) : mapping 된 거를 redirect 시킴

- url의 parameter(short url)로 DB에서 original url 검색(조회 = select)
- **original url로 Redirect**


### DB 설정

- ormconfig.js 파일 생성
- shorturl 칼럼에 unique 제약조건 추가

![image](https://github.com/DeveloperPMYJ/short_url/assets/142304129/1fdcab1c-4d4e-4a1c-9bf8-481b27a2cf9f)  

일반적으로 사용되는 https://www.shorturl.at/ , https://bitly.com/ 를 참고하여, 도메인 부분은 localhost:port로 default 값으로 하고, 뒷부분이 변경되도록


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
