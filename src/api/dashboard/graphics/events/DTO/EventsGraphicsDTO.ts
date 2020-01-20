import { IsDefined, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';
import { DTFromArrayString } from 'src/utils/traformDateTime';

export class EventsGraphicsDTO {
    @IsDefined()
    @Transform(DTFromArrayString)
    @IsDate()
    sdr: Date

    @IsDefined()
    @Transform(DTFromArrayString)
    @IsDate()
    edr: Date
}