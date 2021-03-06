import {
    SequelizeModels
} from "../modelLoader";
import * as moment from "moment";

import {
    Moment
} from "moment";


const scopes: any = {
    byLocation(latitude: number, longitude: number, distance: number) {
        return {
            where: {
                $or: [
                    this.sequelize.literal(`(ST_Distance_Sphere(ST_MakePoint(${latitude}, ${longitude}), "location") <= ${distance})`)
                ]
            }
        }
    },
    withType(type: string): any {
        return {
            subQuery: !type,
            include: [{
                model: this.sequelize.models.types,
                as: "types",
                required: true,
                where: type ? {type}: {}
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

function baseFormat(instance: any, date: number): any {
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
        isOpen: date && checkOpen(instance.openingHours, date),
        distance: instance.dataValues.distance,

        createdAt: instance.createdAt,
        updatedAt: instance.updatedAt,
    };
}

function checkOpen(openingHours ? : any, date ? : number) {
    console.log(moment().format())
    let checkDate, checkDateDay, checkDateDayNumber, openAt, closeAt;
    if (!openingHours || !date) {
        return false;
    }

    checkDate = moment.unix(date).utc();
    checkDateDayNumber = checkDate.isoWeekday();
    checkDateDay = openingHours.workSchedule[checkDateDayNumber];

    if (!checkDateDay) {
        return false;
    }

    checkDate = checkDate.utcOffset(openingHours.timeZoneOffset);
    openAt = moment(checkDateDay.openAt, "HH:mm").utc().utcOffset(openingHours.timeZoneOffset);
    closeAt = moment(checkDateDay.closeAt, "HH:mm").utc().utcOffset(openingHours.timeZoneOffset);
    
    return timeLessThenEqual(openAt, checkDate) && timeGreateThenEqual(closeAt, checkDate);

    function timeLessThenEqual(first: Moment, second: Moment) {
        return first.hours() < second.hours() || first.hours() === second.hours() && first.minutes() <= second.minutes();
    }

    function timeGreateThenEqual(first: Moment, second: Moment) {
        return first.hours() > second.hours() || first.hours() === second.hours() && first.minutes() >= second.minutes();
    }
}

function associate(models: SequelizeModels) {
    models.places.belongsToMany(models.types, {
        through: models.typesByPlaces,
        foreignKey: "placeId",
        otherKey: "typeId",
        as: "types"
    });
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