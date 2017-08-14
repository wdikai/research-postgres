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
        address: {
            type: dataTypes.STRING,
            allowNull: false
        },
        location: {
            type: dataTypes.GEOMETRY('POINT'),
            allowNull: true
        },

        openingHours: {
            type: dataTypes.JSON,
            allowNull: true,
            field: 'opening_hours'
        },

        createdAt: {
            type: dataTypes.INTEGER,
            allowNull: false,
            field: 'created_at'
        },
        updatedAt: {
            type: dataTypes.INTEGER,
            allowNull: false,
            field: 'updated_at'
        }
    };
};