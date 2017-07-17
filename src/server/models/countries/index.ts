import {
    Instance,
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

export type CountryInstancesWithCount = [CountryInstance[], number];