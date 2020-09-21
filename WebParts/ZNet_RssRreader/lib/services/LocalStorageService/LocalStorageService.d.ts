import { ILocalStorageService, ILocalStorageKey } from './ILocalStorageService';
declare class LocalStorageService implements ILocalStorageService {
    constructor();
    /**
     * Attempt to get local storage value based on key
     * @param keyToken the key value used to retrive and verify local storage
     * @return any - the found and validated local storage value
     */
    get(keyToken: ILocalStorageKey): Promise<any>;
    /**
     * Attempt to set local storage value based on key
     * @param keyToken the key value used to store to local storage
     * @return boolean - true upon success
     */
    set(keyToken: ILocalStorageKey): Promise<boolean>;
}
export default LocalStorageService;
