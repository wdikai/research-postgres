import {
    models,
    sequelize
} from '../server/models';
import * as moment from 'moment';
import * as bluebird from 'bluebird';

const data = require('../../data/countries.geo.json');

const reverseCoordinates = (coordinates: any): any => {
    if(!(coordinates instanceof Array)) {
        return coordinates;
    }

    if(typeof coordinates[0] === 'number') {
        return coordinates.reverse();
    }

    return coordinates.map(reverseCoordinates);
};

const parseJson = () => {
    return sequelize.transaction(transaction =>
        bluebird.map(data.features, (feature: any) => models.countries.create({
            name: feature.properties.name,
            border: {
                type: feature.geometry.type,
                coordinates: reverseCoordinates(feature.geometry.coordinates)
            },
            createdAt: moment().unix(),
            updatedAt: moment().unix()
        }, {
            transaction
        })));
};

parseJson();