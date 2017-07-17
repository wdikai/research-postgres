import {
    Model,
    Instance,
    WhereGeometryOptions
} from "sequelize";

export interface PlaceAttributes {
    id ? : number;
    name: string;
    type: string;
    address: string;
    location: WhereGeometryOptions;
    distance ? : number;
    createdAt: number;
    updatedAt: number;
}

export interface PlaceInstance extends Instance < PlaceAttributes > , PlaceAttributes {
    dataValues: PlaceAttributes;
}


export interface PlaceModel extends Model < PlaceInstance, PlaceAttributes > {}

export type PlaceInstancesWithCount = [PlaceInstance[], number];