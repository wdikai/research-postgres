import * as bluebird from "bluebird";
import * as asyncModule from "async";
import * as moment from "moment";

import { models } from '../server/models';

const types = [
    'bank',
    'bar',
    'cafe',
    'food',
    'gym',
    'museum',
    'park',
    'hospital'
];

asyncModule.eachSeries(types, parseJson())

function parseJson() {
    const places = new Map();
    return (type: string, cb: any) => {
        const data = require(`../../data/${type}.places.json`);

        return bluebird
            .mapSeries(
                data.places,
                (place: any) => {
                    if (!places.has(place.id)) {
                        places.set(place.id, place)
                        return insert(place)
                    }

                    return place;
                }
            )
            .then(() => cb())
            .catch(error => {
                console.error(error);
                cb(error);
            });
    }
}

function insert(place: any) {
    return bluebird
        .mapSeries(place.types, (type) => getType(type))
        .then((types) => models.places
            .create(formatPlace(place))
            .then((place) => place.addTypes(types))
        )

}

function getType(type: any) {
    return models.types
        .find(Object.assign({
            where: {
                type
            }
        }))
        .then(typeInstance => {
            return typeInstance || models.types.create({
                type
            })
        });
}

function formatPlace(place: any) {
    return {
        name: place.name,
        address: place.vicinity,
        location: {
            type: 'Point',
            coordinates: [
                place.geometry.location.lat,
                place.geometry.location.lng
            ]
        },
        createdAt: moment().unix(),
        updatedAt: moment().unix()
    }
}