import { BadRequestException } from "@nestjs/common";

export function DTFromArrayString(obj: string): Date {
    const _stages: number[] = obj.trim().split(',', 3).map(_x => {
        return Number.parseInt(_x);
    });

    if (_stages.length != 3) throw new BadRequestException();

    return new Date(Date.UTC(_stages[0],
        _stages[1] - 1, _stages[2], 0, 0, 0, 0));
}