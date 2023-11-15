// 고유한 short url: alnum 없이 하는 방법
export function generateUniqueShortUrl(): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 8; // 길이가 8인 문자열, 영문 대소문자, 숫자 사용
    let uniqueShortUrl = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueShortUrl += characters.charAt(randomIndex);
    }

    return uniqueShortUrl;
}



