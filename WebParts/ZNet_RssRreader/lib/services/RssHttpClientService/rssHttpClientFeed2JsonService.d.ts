import { IRssHttpClientComponentService } from './';
import { IRssReaderRequest, IRssReaderResponse } from '../../models';
export declare class RssHttpClientFeed2JsonService implements IRssHttpClientComponentService {
    get(feedRequest: IRssReaderRequest): Promise<IRssReaderResponse>;
    convertRssFeedToRssReaderResponse(input: any, maxCount: number): IRssReaderResponse;
}
