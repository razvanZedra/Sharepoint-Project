import 'core-js/modules/es7.array.includes.js';
import 'core-js/modules/es6.string.includes.js';
import 'core-js/modules/es6.number.is-nan.js';
declare abstract class BaseTemplateService {
    private _helper;
    CurrentLocale: string;
    constructor();
    private LoadHandlebarsHelpers();
    /**
     * Gets the default Handlebars list item template used in list layout
     * @returns the template HTML markup
     */
    static getListDefaultTemplate(): string;
    /**
     * Gets the default Handlebars custom blank item template
     * @returns the template HTML markup
     */
    static getBlankDefaultTemplate(): string;
    /**
     * Registers useful helpers for search results templates
     */
    private registerTemplateServices();
    /**
     * Compile the specified Handlebars template with the associated context object¸
     * @returns the compiled HTML template string
     */
    processTemplate(templateContext: any, templateContent: string): Promise<string>;
    /**
     * Verifies if the template fiel path is correct
     * @param filePath the file path string
     */
    static isValidTemplateFile(filePath: string): boolean;
    abstract getFileContent(fileUrl: string): Promise<string>;
    abstract ensureFileResolves(fileUrl: string): Promise<void>;
}
export default BaseTemplateService;
