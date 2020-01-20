import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { BuyersGraphicsDTO } from './DTO/buyersGraphicsDTO';
import { Request } from 'src/express/request';
import { BuyersService } from './buyers.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/dashboard/graphics/buyers')
export class BuyersController {
    constructor(private readonly buyersService: BuyersService) {}

    @Get()
    async get(@Query() params: BuyersGraphicsDTO, @Req() request: Request) {
        return await this.buyersService.getGraphics(params, request.user);
    }
}
