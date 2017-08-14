import {
    SequelizeModels
} from "../bootstrapper";
import * as moment from "moment";

import {
    Moment
} from "moment";


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

function baseFormat(instance: any, date: string): any {
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
        distance: instance.distance,

        createdAt: instance.createdAt,
        updatedAt: instance.updatedAt,
    };
}

function checkOpen(workSchedule ? : any, date ? : string ) {
    console.log(moment().format())
    let checkDate, checkDateDay, checkDateDayNumber, openAt, closeAt;
    if (!workSchedule || !date) {
        return false;
    }

    checkDate = moment(date).utc();
    checkDateDayNumber = checkDate.isoWeekday();
    checkDateDay = workSchedule.openingHours[checkDateDayNumber];

    if (!checkDateDay) {
        return false;
    }

    checkDate = checkDate.utcOffset(workSchedule.timeZoneOffset);
    openAt = moment(checkDateDay.openAt, "HH:mm").utc().utcOffset(workSchedule.timeZoneOffset);
    closeAt = moment(checkDateDay.closeAt, "HH:mm").utc().utcOffset(workSchedule.timeZoneOffset);

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