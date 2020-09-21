import { SPHttpClient } from '@microsoft/sp-http';
import BaseTemplateService from './BaseTemplateService';
declare class TemplateService extends BaseTemplateService {
    private _spHttpClient;
    constructor(spHttpClient: SPHttpClient, locale: string);
    /**
     * Gets the external file content from the specified URL
     * @param fileUrl the file URL
     */
    getFileContent(fileUrl: string): Promise<string>;
    /**
     * Ensures the file is accessible trough the specified URL
     * @param filePath the file URL
     */
    ensureFileResolves(fileUrl: string): Promise<void>;
}
export default TemplateService;
