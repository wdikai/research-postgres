import {Bootsrapper, SequelizeModels} from "./bootstrapper";

const database =  new Bootsrapper();
export const models: SequelizeModels = database.getModels();
export const sequelize = database.getSequelize();