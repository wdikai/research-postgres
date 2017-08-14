import { Model, Instance } from "sequelize";

export interface TypesByPlacesAttributes {
    id ? : number;
    placeId: number;
    typeId: number;
}

export interface TypesByPlacesInstance extends Instance < TypesByPlacesAttributes > , TypesByPlacesAttributes {
    dataValues: TypesByPlacesAttributes;
}

export interface TypesByPlacesModel extends Model < TypesByPlacesInstance, TypesByPlacesAttributes > {
    baseFormat(TypesByPlaces: TypesByPlacesInstance): any
}