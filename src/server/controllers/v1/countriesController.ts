import {
    Controller,
    JsonResponse,
    Get,
    QueryParam,
} from 'routing-controllers';

import {
    models
} from '../../models';

import {
    HttpError
} from '../../utils/httpError';

@Controller('/v1/countries')
export default class CountriesController {
    @Get()
    @JsonResponse()
    public async getAll(
        @QueryParam('limit') limit: number = 20,
        @QueryParam('offset') offset: number = 0,
    ) {
        const data = await Promise.all([
            models.countries.all({
                limit,
                offset
            }).map(country => ( < any > country).toJSON()),
            models.countries.count(),
        ]);

        return {
            data: data[0],
            count: data[1]
        };
    }

    @Get("/current")
    @JsonResponse()
    public async getOne(
        @QueryParam('latitude') latitude: number = 0,
        @QueryParam('longitude') longitude: number = 0,
    ) {
        const scopes = [{
            method: [
                'byLocation',
                latitude,
                longitude
            ]
        }];

        const data = await models.countries.scope(scopes).find();
        if (!data) {
            throw new HttpError("Country not found", 404);
        }


        return {
            data: ( < any > data).toJSON()
        };
    }

}