import {
    Controller,
    JsonResponse,
    Get,
    QueryParam
} from 'routing-controllers';

import {
    models,
    sequelize
} from '../../models';

@Controller('/v1/places')
export default class PlacesController {
    @Get()
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
        const scopes = [
            {method: ["byLocation", latitude, longitude, distance]},
            {method: ['byType', type]}
        ];
        const countOptions: any = {
            distinct: true,
            attributes: [],
            includeIgnoreAttributes: false
        };
        const getOptions: any = {
            attributes: {include: [[
                sequelize.fn(`ST_Distance_Sphere`, 
                    sequelize.fn(`ST_MakePoint`, latitude, longitude), 
                    sequelize.col("location")
                ),
                "distanse"
            ]]},
            limit,
            offset,
            order: 'distanse ASC'
        };

        if (name) {
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

}