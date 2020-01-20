import { Transform } from "class-transformer"
import { IsDefined, IsDate } from "class-validator"
import { DTFromArrayString } from "src/utils/traformDateTime"

export class TicketsGraphicsDTO {
    @IsDefined()
    @Transform(DTFromArrayString)
    @IsDate()
    sdr: Date

    @IsDefined()
    @Transform(DTFromArrayString)
    @IsDate()
    edr: Date
}