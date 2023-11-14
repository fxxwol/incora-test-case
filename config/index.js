require('dotenv').config();

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env


module.exports = {
    development: {
        serviceTimeout: 30,
        postgres: {
            options: {
                host: DB_HOST,
                port: DB_PORT,
                database: DB_NAME,
                username: DB_USERNAME,
                password: DB_PASSWORD,
                dialect: 'postgres',
            },
            client: null
        },
    },
    production: {
        serviceTimeout: 30,
    },
    test: {
        serviceTimeout: 30,
    },
};