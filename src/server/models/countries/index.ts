import {
    Instance,
    Model,
    WhereGeometryOptions
} from "sequelize";

export interface CountryAttributes {
    id ? : number;
    name: string;
    border: WhereGeometryOptions;
    createdAt: number;
    updatedAt: number;
}

export interface CountryInstance extends Instance < CountryAttributes > , CountryAttributes {
    dataValues: CountryAttributes;
}


export interface CountryModel extends Model < CountryInstance, CountryAttributes > {}