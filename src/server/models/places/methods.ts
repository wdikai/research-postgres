import {
    SequelizeModels
} from "../bootstrapper";

const scopes: any = {
    byLocation(latitude: number, longitude: number, distance: number) {
        return {
            $or: [
                this.sequelize.literal(`(ST_Distance_Sphere(ST_MakePoint(${latitude}, ${longitude}), "location") <= ${distance})`)
            ]
        }
    },
    byType(type: string): any {
        return {
            include: [{
                model: this.sequelize.models.types,
                as: "types"
            }]
        };
    },
    byName(name: string): any {
        return name ? {
            where: {
                name: {
                    $like: `%${name}%`
                }
            }
        } : {};
    }
}

function baseFormat(instance: any): any {
    return {
        id: instance.id,
        name: instance.name,
        type: instance.types.map((t: any) => t.type),
        address: instance.address,
        location: instance.location && {
            latitude: instance.location.coordinates[0],
            longitude: instance.location.coordinates[1],
        },
        openingHours: instance.openingHours,
        distance: instance.distance,

        createdAt: instance.createdAt,
        updatedAt: instance.updatedAt,
    };
}

function associate(models: SequelizeModels) {
    models.places.belongsToMany(models.types, {
        through: models.typesByPlaces,
        foreignKey: "placeId",
        otherKey: "typeId",
        as: "types"
    })
}

export const methods: any = {
    tableName: 'places',
    timestamps: false,
    scopes,
    classMethods: {
        baseFormat,
        associate
    }
};