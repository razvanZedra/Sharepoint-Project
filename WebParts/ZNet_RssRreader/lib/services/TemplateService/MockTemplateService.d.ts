import BaseTemplateService from './BaseTemplateService';
declare class MockTemplateService extends BaseTemplateService {
    constructor(locale: string);
    private readonly _mockFileContent;
    getFileContent(fileUrl: string): Promise<string>;
    ensureFileResolves(fileUrl: string): Promise<void>;
}
export default MockTemplateService;
