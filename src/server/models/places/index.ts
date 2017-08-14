import {
    Model,
    Instance,
    WhereGeometryOptions
} from "sequelize";

export interface PlaceAttributes {
    id ? : number;
    name: string;
    address: string;
    location: WhereGeometryOptions;
    openingHours ? : any;
    distance ? : number;
    createdAt: number;
    updatedAt: number;
}

export interface PlaceInstance extends Instance < PlaceAttributes > , PlaceAttributes {
    dataValues: PlaceAttributes;
    addTypes(types: any[], options?: any): Promise < any > ;
}

export interface PlaceModel extends Model < PlaceInstance, PlaceAttributes > {
    baseFormat(place: any, date?: any): any,
}