import {
    JsonController,
    JsonResponse,
    Get,
    QueryParam,
    Param
} from 'routing-controllers';

import {
    models,
    sequelize
} from '../../models';

import {
    HttpError
} from '../../utils/httpError';


@JsonController()
export default class PlacesController {
    @Get('/v1/places')
    @JsonResponse()
    public async getAll(
        @QueryParam('latitude') latitude: number = 0,
        @QueryParam('longitude') longitude: number = 0,
        @QueryParam('distance') distance: number = 1000,

        @QueryParam('limit') limit: number = 20,
        @QueryParam('offset') offset: number = 0,

        @QueryParam('type') type ? : string,
        @QueryParam('name') name ? : string,
    ) {
        let model, data;
        const scopes = [{
                method: ["byLocation", latitude, longitude, distance]
            },
            {
                method: ['withType', type]
            }
        ];
        const countOptions: any = {
            distinct: true,
            attributes: [],
            includeIgnoreAttributes: false
        };
        const getOptions: any = {
            attributes: {
                include: [
                    [
                        sequelize.fn(`ST_Distance_Sphere`,
                            sequelize.fn(`ST_MakePoint`, latitude, longitude),
                            sequelize.col("location")
                        ),
                        "distance"
                    ]
                ]
            },
            limit,
            offset,
            order: 'distance ASC'
        };

        if (name && name.length > 3) {
            scopes.push({
                method: ['byName', name]
            });
        }

        model = models.places.scope(scopes);

        data = await Promise.all([
            model.all(getOptions).map((place: any) => models.places.baseFormat(place)),
            model.aggregate("places.id", "count", countOptions),
        ]);

        return {
            data: data[0],
            count: data[1]
        };
    }

    @Get("/v1/places/:placeId")
    @JsonResponse()
    public async getOne(
        @Param('placeId') placeId: number,
        @QueryParam('date') date: string,
    ) {
        let data;
        const scopes = [{
            method: ['withType']
        }];

        data = await models.places.scope(scopes).findById(placeId);

        if (!data) {
            throw new HttpError("Place not found", 404)
        }

        return {
            data: models.places.baseFormat(data, date)
        };
    }

    @Get("/v1/types")
    @JsonResponse()
    public async getTypes() {
        const types = await models.types.all();

        return {data: types.map(type => type.type)};
    }

}