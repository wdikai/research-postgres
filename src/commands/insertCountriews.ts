import {
    models,
    sequelize
} from '../server/models';
import * as moment from 'moment';
import * as bluebird from 'bluebird';

const data = require('../../data/countries.geo.json');

const parseJson = () => {
    return sequelize.transaction(transaction =>
        bluebird.map(data.features, (feature: any) => models.countries.create({
            name: feature.properties.name,
            border: {
                type: feature.geometry.type,
                coordinates: feature.geometry.coordinates
            },
            createdAt: moment().unix(),
            updatedAt: moment().unix()
        }, {
            transaction
        })));
};

parseJson();