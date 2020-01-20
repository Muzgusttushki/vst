import { Controller, Get, Req, UseGuards, Param, Query } from '@nestjs/common';
import { EventsGraphicsDTO } from './DTO/EventsGraphicsDTO';
import { Request } from 'src/express/request';
import { EventsService } from './events.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/dashboard/graphics/events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    async get(@Query() params: EventsGraphicsDTO, @Req() request: Request) {
        return await this.eventsService.getGraphics(params, request.user);
    }
}
