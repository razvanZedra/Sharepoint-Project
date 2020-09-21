import { IRssHttpClientComponentService } from './';
import { IRssReaderResponse, IRssReaderRequest } from '../../models';
export declare class RssHttpClientDirectService implements IRssHttpClientComponentService {
    get(feedRequest: IRssReaderRequest): Promise<IRssReaderResponse>;
    convertRssFeedToRssReaderResponse(input: any, maxCount: number): IRssReaderResponse;
}
