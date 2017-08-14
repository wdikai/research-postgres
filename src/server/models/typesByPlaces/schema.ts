import {
    DataTypes,
    Sequelize
} from "sequelize";

export function schema(sequelize: Sequelize, dataTypes: DataTypes) {
    return {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        placeId: {
            type: dataTypes.INTEGER,
            allowNull: false,
            field: 'place_id'
        },
        typeId: {
            type: dataTypes.INTEGER,
            allowNull: false,
            field: 'type_id'
        }
    };
};