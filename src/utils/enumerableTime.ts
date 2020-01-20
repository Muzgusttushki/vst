export function EnumerableTime(x: Date, y: Date, pointers: number = 24) {
    const _x = new Date(x),
        _y = new Date(x);

    _x.setUTCHours(0, 0, 0, 0);
    _y.setUTCHours(0, 0, 0, 0);

    const _factorInterval = Math.ceil(Math.abs(x.getTime() -
        y.getTime()) / (1000 * 3600 * 24) + 1) * 24 / pointers;

    return new Array(pointers).fill(1).map(() => {
        try {
            _y.setUTCHours(_y.getUTCHours() + _factorInterval);
            _y.setUTCMilliseconds(_y.getUTCMilliseconds() - 1);
            if (_y.getUTCMilliseconds() < 999) _y.setUTCMilliseconds(999);

            return [new Date(_x.toUTCString()), new Date(_y.toUTCString())]
        } finally { _x.setUTCHours(_x.getUTCHours() + _factorInterval); }
    })
}