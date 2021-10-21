import { MessageBarType } from "@fluentui/react";

export enum Mode {
    Example, Example2
}
export interface IEntityParam {
    type: Mode,
    id: string
}


export interface IUser {
    id: string,
    fullname: string,
    firstname: string,
    lastname: string,
    email: string,
    busunessUnitId: string,
    roles?: string[],
}

export interface INotification {
    type: MessageBarType,
    message: string
}