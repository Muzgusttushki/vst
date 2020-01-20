import { APICodes } from "./message-codes";

export interface EchoState<T> {
    error?: boolean,
    code: APICodes,

    state?: T
}