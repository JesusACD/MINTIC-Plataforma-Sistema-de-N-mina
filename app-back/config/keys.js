require('dotenv').config()
//require('dotenv').config()
module.exports = {
    mongodb: {
        host: process.env.MONGODB_HOST,
        port: process.env.MONGODB_PORT,
        database: process.env.MONGODB_DATABASE,
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD
    },
    jwtKey: {
        jwtPrivateKey: process.env.JWT_PRIVATE_KEY
    },
    gmail: {
        pass: process.env.PASS
    }
}