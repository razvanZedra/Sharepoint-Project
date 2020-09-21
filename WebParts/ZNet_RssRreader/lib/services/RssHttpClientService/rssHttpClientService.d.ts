import { WebPartContext } from '@microsoft/sp-webpart-base';
export declare class RssHttpClientService {
    private static _httpClient;
    static init(context: WebPartContext): Promise<void>;
    static getRssJson(url: string, corsProxyUrl: string, disableCors: boolean): Promise<any>;
    static getRssXml(url: string, corsProxyUrl: string, disableCors: boolean): Promise<any>;
    private static processCorsProxyUrl(url, corsProxyUrl);
}
