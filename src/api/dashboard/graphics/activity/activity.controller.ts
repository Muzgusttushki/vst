import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityGraphicsDTO } from './DTO/ActivityGraphicsDTO';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'src/express/request';

@UseGuards(AuthGuard('jwt'))
@Controller('api/dashboard/graphics/activity')
export class ActivityController {
    constructor(private readonly sheetsRepository: ActivityService) { }

    @Get()
    async get(@Query() params: ActivityGraphicsDTO, @Req() req: Request) {
        return await this.sheetsRepository.getGraphics(params,
            req.user);
    }
}
