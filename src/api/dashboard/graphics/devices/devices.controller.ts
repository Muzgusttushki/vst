import { Controller, UseGuards, Get, Query, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DevicesGraphicsDTO } from './DTO/devicesGraphicsDTO';
import { Request } from 'src/express/request';
import { DevicesService } from './devices.service';

@UseGuards(AuthGuard('jwt'))
@Controller('api/dashboard/graphics/devices')
export class DevicesController {
    constructor(private readonly devicesService: DevicesService) {}

    @Get()
    async get(@Query() params: DevicesGraphicsDTO, @Req() request: Request) {
        return await this.devicesService.getGraphics(params, request.user);
    }
}
