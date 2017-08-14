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
        type: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
};