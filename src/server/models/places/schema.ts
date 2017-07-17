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
        type: {
            type: dataTypes.STRING,
            allowNull: false
        },
        address: {
            type: dataTypes.STRING,
            allowNull: false
        },
        location: {
            type: dataTypes.GEOMETRY('POINT'),
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