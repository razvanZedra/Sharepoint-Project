import { IRssReaderResponse, IRssReaderRequest } from '../../models';
export interface IRssReaderService {
    getFeed(feedRequest: IRssReaderRequest): Promise<IRssReaderResponse>;
}
export declare class RssReaderService implements IRssReaderService {
    private static storageKeyPrefix;
    constructor();
    static getFeedStorageKeyName(feedRequest: IRssReaderRequest): string;
    static getFeedStorageKeyPrefix(feedRequest: IRssReaderRequest): string;
    getFeed(feedRequest: IRssReaderRequest): Promise<IRssReaderResponse>;
}
