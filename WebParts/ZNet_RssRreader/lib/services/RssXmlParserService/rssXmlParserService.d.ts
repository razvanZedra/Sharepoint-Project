export declare class RssXmlParserService {
    private static DEFAULT_HEADERS;
    private static DEFAULT_MAX_REDIRECTS;
    private static DEFAULT_TIMEOUT;
    private static options;
    static init(options?: any): Promise<void>;
    static parse(xmlFeed: string, options?: any): Promise<any>;
    private static buildAtomFeed(xmlObj);
    static buildRSS0_9(xmlObj: any): any;
    static buildRSS1(xmlObj: any): any;
    static buildRSS2(xmlObj: any): any;
    static buildRSS(channel: any, items: any): any;
    /**
     * Add iTunes specific fields from XML to extracted JSON
     *
     * @access public
     * @param {object} feed extracted
     * @param {object} channel parsed XML
     */
    static decorateItunes(feed: any, channel: any): void;
    static setISODate(item: any): void;
}
