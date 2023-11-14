// export default () => ({
//     DB_HOST: process.env.DB_HOST || 'localhost',
//     DB_PORT: process.env.DB_PORT || 3306,
//     DB_USERNAME: process.env.DB_USERNAME || 'root',
//     DB_PASSWORD: process.env.DB_PASSWORD || '',
//     DB_DATABASE: process.env.DB_NAME || 'dblog',
//     PORT: process.env.PORT || 3000,
// });


export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306
    }
});