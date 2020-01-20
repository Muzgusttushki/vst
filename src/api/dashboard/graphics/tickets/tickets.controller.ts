import { Controller, UseGuards, Get, Query, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TicketsGraphicsDTO } from './DTO/ticketsGraphicsDTO';
import { Request } from 'src/express/request';
import { TicketsService } from './tickets.service';


@UseGuards(AuthGuard('jwt'))
@Controller('api/dashboard/graphics/tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}


    @Get()
    async get(@Query() params: TicketsGraphicsDTO, @Req() request: Request) {
        return await this.ticketsService.getGraphics(params, request.user);
    }
}
