const configs = require('../../../config/config.json');
const environment = process.env.NODE_ENV || 'dev';
const config = configs[environment];

export interface DBConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string;
    logging ? : boolean | Function;
    force ? : boolean;
    timezone ? : string;
}

export const dbConfig: DBConfig = {
    username: config.username,
    password: config.password,
    database: config.database,
    host: config.host,
    port: config.port,
    dialect: config.dialect
};