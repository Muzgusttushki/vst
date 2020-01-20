import { Controller, Get, UseGuards, Query, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocationsGraphicsDTO } from './DTO/locationsGraphicsDTO';
import { Request } from 'src/express/request';
import { LocationsService } from './locations.service';

@UseGuards(AuthGuard('jwt'))
@Controller('api/dashboard/graphics/locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) {}

    @Get()
    async get(@Query() params: LocationsGraphicsDTO, @Req() request: Request) {
        return await this.locationsService.getGraphics(params, request.user);
    }
}
