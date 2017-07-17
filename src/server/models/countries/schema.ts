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
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        border: {
            type: dataTypes.GEOMETRY('POLYGON'),
            allowNull: true
        },
        createdAt: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        updatedAt: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
};