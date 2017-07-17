import {
    Controller,
    JsonResponse,
    Get,
    QueryParam
} from 'routing-controllers';
import {
    models
} from '../../models';

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

}