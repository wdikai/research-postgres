import {
    models,
    sequelize
} from '../server/models';
import * as moment from 'moment';
import * as bluebird from 'bluebird';

const types = ['store', 'cafe', 'park', 'parking', 'hospital', 'bar', 'bank', 'airport']

const parseJson = (type: string) => {
    const data = require(`../../data/${type}.places.json`);

    return sequelize.transaction(transaction => bluebird.map(data.places, (place: any) => models.places.create({
        name: place.name,
        type: type,
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
    }, {
        transaction
    })));
};


types.forEach(parseJson);