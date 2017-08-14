import * as GooglePlaces from "node-googleplaces";
import * as bluebird from "bluebird";
import * as asyncModule from "async";
import * as moment from "moment";

import {
    models,
    sequelize
} from '../server/models';

const apiKey = "AIzaSyDk4C89ZwWn71OVonWYynzYXWOao4m8yas";
const api = new GooglePlaces(apiKey);
const defaultOptions = {
    languige: 'en',
    location: "49.9935, 36.2304",
    radius: 50000
};
const defaultLimit = 20;
const limit = 100;

const types = [
    "bank",
    "bar",
    "cafe",
    "food",
    "gym",
    "museum",
    "park",
    "hospital"
];

class PlacesLoader {
    placesMap: Map < string, any > ;

    public loadBy(types: string[]) {
        if (this.placesMap) {
            return Promise.reject(new Error('Loader already started!'))
        }

        this.placesMap = new Map();
        return new Promise((resolve: Function, reject: Function) => {
            asyncModule.eachSeries(
                types,
                (type: string, cb: any) => {
                    this.load(type)
                        .then((places: Map < string, any > ) => places.forEach((value: any, key: string) => this.addPlace(value)))
                        .then(() => cb())
                        .catch(cb);
                },
                (error) => error ? reject(error) : resolve()
            );
        });
    }

    public save() {
        return sequelize.transaction(transaction => bluebird.map(Array.from(this.placesMap.values()), (place) => insert(place, {
            transaction
        })));

        function insert(place: any, options: any) {
            return bluebird
                .map(place.type, getType)
                .then((types) => models.places
                    .create(formatPlace(place), options)
                    .then((place) => place.addTypes(types, options))
                )

        }

        function getType(type: any) {
            return models.types
                .findOrCreate({
                    where: {
                        type
                    }
                })
                .spread(type => type)
        }

        function formatPlace(place: any) {
            return {
                name: place.name,
                address: place.vicinity,
                location: place.location,
                createdAt: moment().unix(),
                updatedAt: moment().unix()
            }
        }
    }

    private load(type: string, places = new Map(), nextPageToken ? : string) {
        return new Promise((resolve: Function, reject: Function) => {
            const params = Object.assign({
                type,
                next_page_token: nextPageToken
            }, defaultOptions);

            if (places.size > limit) {
                return resolve(places);
            }

            api.nearbySearch(params, (error: any, res: any) => {
                if (error) {
                    return reject(error);
                }

                res.body.results.forEach((place: any) => {
                    if (!places.has(place.id)) {
                        places.set(place.id, PlacesLoader.formatPlace(place));
                    }
                });

                if (res.body.results < defaultLimit || !res.body.next_page_token) {
                    return resolve(places);
                }

                this.load(type, places, res.body.next_page_token)
                    .then((result) => resolve(result))
                    .catch((error) => reject(error));
            });
        });
    }

    private addPlace(place: any) {
        let hasPlace = this.placesMap.has(place.id);
        if (!hasPlace) {
            this.placesMap.set(place.id, place);
        }

        return !hasPlace;
    }

    static formatPlace(place: any) {
        return {
            id: place.id,
            name: place.name,
            types: place.types,
            address: place.vicinity,
            location: {
                type: 'Point',
                coordinates: [
                    place.geometry.location.lat,
                    place.geometry.location.lng
                ]
            }
        };
    }
}

console.log("Start grab");
const loader = new PlacesLoader();
loader
    .loadBy(types)
    .then(() => console.log("Compleate grab", loader.placesMap.size))
    .catch(error => console.error("Error:", error));