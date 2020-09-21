import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import { FeedLayoutOption, FeedServiceOption } from '../../models';
export interface IRssReaderWebPartProps {
    title: string;
    feedUrl: string;
    feedService: FeedServiceOption;
    feedServiceUrl: string;
    feedServiceApiKey: string;
    disableCorsMode: boolean;
    useCorsProxy: boolean;
    corsProxyUrl: string;
    maxCount: number;
    cacheResults: boolean;
    cacheResultsMinutes: number;
    cacheStorageKeyPrefix: string;
    feedLoadingLabel: string;
    selectedLayout: FeedLayoutOption;
    externalTemplateUrl: string;
    inlineTemplateText: string;
    feedViewAllLink: string;
    feedViewAllLinkLabel: string;
    showDesc: boolean;
    showPubDate: boolean;
    descCharacterLimit: number;
    titleLinkTarget: string;
    dateFormat: string;
    dateFormatLang: string;
    backgroundColor: string;
    fontColor: string;
}
export default class RssReaderWebPart extends BaseClientSideWebPart<IRssReaderWebPartProps> {
    private _templateService;
    private _propertyPage;
    /**
     * The template to display at render time
     */
    private _templateContentToDisplay;
    onInit(): Promise<void>;
    render(): Promise<void>;
    protected onDispose(): void;
    protected readonly disableReactivePropertyChanges: boolean;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    protected onPropertyPaneFieldChanged(propertyPath: string): Promise<void>;
    /**
     * Initializes the Web Part required properties if there are not present in the manifest (i.e. during an update scenario)
     */
    private initializeRequiredProperties();
    /**
     * Custom handler when a custom property pane field is updated
     * @param propertyPath the name of the updated property
     * @param newValue the new value for this property
     */
    private _onCustomPropertyPaneChange(propertyPath, newValue);
    protected loadPropertyPaneResources(): Promise<void>;
    /**
     * Step 1: Set general feed properties including feed location, method to retrieve feed, and caching (local storage)
     */
    private _getFeedSettingsFields();
    /**
     * Step 1B: Set feed cors settings
     */
    private _getCorsSettingsFields();
    /**
     * Step 2: Set feed layout settings
     */
    private _getLayoutSettingsFields();
    /**
     * Custom handler when the external template file URL
     * from https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-search-refiners
     * @param value the template file URL value
     */
    private _onTemplateUrlChange(value);
    /**
     * Get the correct results template content according to the property pane current configuration
     * @returns the template content as a string
     */
    private _getTemplateContent();
}
