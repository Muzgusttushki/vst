import { IsDefined, IsDate, IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { DTFromArrayString } from 'src/utils/traformDateTime';

export class LocationsGraphicsDTO {
    @IsDefined()
    @Transform(DTFromArrayString)
    @IsDate()
    sdr: Date

    @IsDefined()
    @Transform(DTFromArrayString)
    @IsDate()
    edr: Date

    @IsDefined()
    @IsNumber()
    @Transform(x => parseInt(x))
    @Min(1)
    @Max(15)
    views: number;
}