import { IRssHttpClientComponentService } from './';
import { IRssReaderRequest, IRssReaderResponse } from '../../models';
export declare class RssHttpClientRss2JsonService implements IRssHttpClientComponentService {
    get(feedRequest: IRssReaderRequest): Promise<IRssReaderResponse>;
    convertRssFeedToRssReaderResponse(input: any, maxCount?: number): IRssReaderResponse;
}
