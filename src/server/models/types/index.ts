import {
    Model,
    Instance
} from "sequelize";

export interface TypeAttributes {
    id ? : number;
    type: string;
}

export interface TypeInstance extends Instance < TypeAttributes > , TypeAttributes {
    dataValues: TypeAttributes;
}

export interface TypeModel extends Model < TypeInstance, TypeAttributes > {
    baseFormat(Type: TypeInstance): any
}