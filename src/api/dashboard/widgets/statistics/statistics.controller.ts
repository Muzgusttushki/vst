import { Controller, UseGuards, Get, Query, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StatisticWidgetDTO } from './DTO/statisticsWidgetDTO';
import { Request } from 'src/express/request';
import { StatisticsService } from './statistics.service';

@UseGuards(AuthGuard('jwt'))
@Controller('api/dashboard/widgets/statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) {}

    @Get()
    async get(@Query() params: StatisticWidgetDTO, @Req() request: Request) {
        return await this.statisticsService.getWidget(params, request.user);
    }
}
