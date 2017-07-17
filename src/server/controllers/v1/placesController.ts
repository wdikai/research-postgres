import {
    Controller,
    JsonResponse,
    Get,
    QueryParam
} from 'routing-controllers';

import {
    models
} from '../../models';

@Controller('/v1/places')
export default class PlacesController {
    @Get()
    @JsonResponse()
    public async getAll(
        @QueryParam('distance') type: string,
        @QueryParam('latitude') latitude: number = 0,
        @QueryParam('longitude') longitude: number = 0,
        @QueryParam('distance') distance: number = 1000,
        @QueryParam('limit') limit: number = 20,
        @QueryParam('offset') offset: number = 0,
    ) {
        const scopes = [{
            method: [
                'byLocation',
                latitude,
                longitude,
                distance
            ]
        }];

        if (type) {
            scopes.push({
                method: ['byType', type]
            });
        }

        const data = await Promise.all([
            models.places.scope(scopes).all().map(place => ( < any > place).toJSON()),
            models.places.scope(scopes).count(),
        ]);

        return {
            data: data[0],
            count: data[1]
        };
    }

}