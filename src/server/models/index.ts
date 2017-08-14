import {ModelLoader, SequelizeModels} from "./modelLoader";

const database =  new ModelLoader();
export const models: SequelizeModels = database.getModels();
export const sequelize = database.getSequelize();