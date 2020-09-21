export interface ILocalStorageKey {
    keyName: any;
    keyPrefix?: string;
    keyValue?: any;
    timeOutInMinutes?: number;
}
export interface ILocalStorageObject {
    keyValue: any;
    keyDate: Date;
}
export interface ILocalStorageService {
    get(keyToken: ILocalStorageKey): Promise<any>;
    set(keyToken: ILocalStorageKey): Promise<boolean>;
}
