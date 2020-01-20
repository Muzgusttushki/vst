
export namespace uuid {
    export function toBinary(x: string): string {
        return `UUID_TO_BIN(${x})`;
    }

    export function fromBinary(x: Buffer): string {
        return `BIN_TO_UUID(${x})`;
    }
}