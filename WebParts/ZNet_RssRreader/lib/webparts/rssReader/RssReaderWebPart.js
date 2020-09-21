var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*
Template concept from https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-search-refiners
*/
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Text, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneTextField, PropertyPaneSlider, PropertyPaneToggle, PropertyPaneChoiceGroup, PropertyPaneHorizontalRule, PropertyPaneLabel } from '@microsoft/sp-webpart-base';
import { update, isEmpty } from '@microsoft/sp-lodash-subset';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import * as strings from 'RssReaderWebPartStrings';
import { RssReader } from './components/RssReader';
import { RssHttpClientService } from '../../services/RssHttpClientService';
import { TemplateService, MockTemplateService } from '../../services/TemplateService';
import { FeedLayoutOption, FeedServiceOption } from '../../models';
var RssReaderWebPart = (function (_super) {
    __extends(RssReaderWebPart, _super);
    function RssReaderWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._propertyPage = null;
        return _this;
    }
    RssReaderWebPart.prototype.onInit = function () {
        //Initialize a redux store that uses our custom Reducer & state
        RssHttpClientService.init(this.context);
        //set required properties to enforce certainer parameters
        this.initializeRequiredProperties();
        if (Environment.type === EnvironmentType.Local) {
            this._templateService = new MockTemplateService(this.context.pageContext.cultureInfo.currentUICultureName);
        }
        else {
            this._templateService = new TemplateService(this.context.spHttpClient, this.context.pageContext.cultureInfo.currentUICultureName);
        }
        return _super.prototype.onInit.call(this).then();
    };
    RssReaderWebPart.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Determine the template content to display
                    // In the case of an external template is selected, the render is done asynchronously waiting for the content to be fetched
                    return [4 /*yield*/, this._getTemplateContent()];
                    case 1:
                        // Determine the template content to display
                        // In the case of an external template is selected, the render is done asynchronously waiting for the content to be fetched
                        _a.sent();
                        element = React.createElement(RssReader, {
                            feedUrl: this.properties.feedUrl,
                            feedService: this.properties.feedService,
                            feedServiceUrl: this.properties.feedServiceUrl,
                            feedServiceApiKey: this.properties.feedServiceApiKey,
                            useCorsProxy: this.properties.useCorsProxy,
                            corsProxyUrl: this.properties.corsProxyUrl,
                            disableCorsMode: this.properties.disableCorsMode,
                            maxCount: this.properties.maxCount,
                            cacheResults: this.properties.cacheResults,
                            cacheResultsMinutes: this.properties.cacheResultsMinutes,
                            cacheStorageKeyPrefix: this.properties.cacheStorageKeyPrefix,
                            feedLoadingLabel: this.properties.feedLoadingLabel,
                            selectedLayout: this.properties.selectedLayout,
                            externalTemplateUrl: this.properties.externalTemplateUrl,
                            inlineTemplateText: this.properties.inlineTemplateText,
                            feedViewAllLink: this.properties.feedViewAllLink,
                            feedViewAllLinkLabel: this.properties.feedViewAllLinkLabel,
                            showDesc: this.properties.showDesc,
                            showPubDate: this.properties.showPubDate,
                            descCharacterLimit: this.properties.descCharacterLimit,
                            titleLinkTarget: this.properties.titleLinkTarget,
                            dateFormat: this.properties.dateFormat,
                            backgroundColor: this.properties.backgroundColor,
                            fontColor: this.properties.fontColor,
                            propertyPane: this.context.propertyPane,
                            title: this.properties.title,
                            displayMode: this.displayMode,
                            templateService: this._templateService,
                            templateContent: this._templateContentToDisplay,
                            updateProperty: function (value) {
                                _this.properties.title = value;
                            }
                        });
                        ReactDom.render(element, this.domElement);
                        return [2 /*return*/];
                }
            });
        });
    };
    RssReaderWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(RssReaderWebPart.prototype, "disableReactivePropertyChanges", {
        //return false if property changes should occur upon change, not upon apply
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RssReaderWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    RssReaderWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.FeedSettingsPageName
                    },
                    groups: [
                        {
                            groupName: strings.FeedSettingsGroupLabel,
                            groupFields: this._getFeedSettingsFields()
                        },
                        {
                            groupName: strings.CorsSettingsGroupLabel,
                            isCollapsed: true,
                            groupFields: this._getCorsSettingsFields()
                        }
                    ],
                    displayGroupsAsAccordion: true
                },
                {
                    header: {
                        description: strings.LayoutSettingsPageName
                    },
                    groups: [
                        {
                            groupFields: this._getLayoutSettingsFields()
                        }
                    ]
                }
            ]
        };
    };
    RssReaderWebPart.prototype.onPropertyPaneFieldChanged = function (propertyPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(propertyPath === 'selectedLayout')) return [3 /*break*/, 2];
                        // Refresh setting the right template for the property pane
                        return [4 /*yield*/, this._getTemplateContent()];
                    case 1:
                        // Refresh setting the right template for the property pane
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        // Detect if the layout has been changed to custom...
                        if (propertyPath === 'inlineTemplateText') {
                            // Automatically switch the option to 'Custom' if a default template has been edited
                            // (meaning the user started from a the list or tiles template)
                            if (this.properties.inlineTemplateText && this.properties.selectedLayout !== FeedLayoutOption.Custom) {
                                this.properties.selectedLayout = FeedLayoutOption.Custom;
                                // Reset also the template URL
                                this.properties.externalTemplateUrl = '';
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Initializes the Web Part required properties if there are not present in the manifest (i.e. during an update scenario)
     */
    RssReaderWebPart.prototype.initializeRequiredProperties = function () {
        //require an initial feed service
        this.properties.feedService = this.properties.feedService ? this.properties.feedService : FeedServiceOption.Rss2Json;
        this.properties.useCorsProxy = this.properties.useCorsProxy ? true : false;
        this.properties.corsProxyUrl = this.properties.corsProxyUrl ? this.properties.corsProxyUrl : "";
        this.properties.disableCorsMode = this.properties.disableCorsMode ? true : false;
        this.properties.maxCount = this.properties.maxCount ? this.properties.maxCount : 10;
        this.properties.cacheResults = this.properties.cacheResults ? this.properties.cacheResults : false;
        this.properties.cacheResultsMinutes = this.properties.cacheResultsMinutes ? this.properties.cacheResultsMinutes : 60;
        // Set the default search results layout
        this.properties.selectedLayout = this.properties.selectedLayout ? this.properties.selectedLayout : FeedLayoutOption.Default;
    };
    /**
     * Custom handler when a custom property pane field is updated
     * @param propertyPath the name of the updated property
     * @param newValue the new value for this property
     */
    RssReaderWebPart.prototype._onCustomPropertyPaneChange = function (propertyPath, newValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Stores the new value in web part properties
                        update(this.properties, propertyPath, function () { return newValue; });
                        // Call the default SPFx handler
                        this.onPropertyPaneFieldChanged(propertyPath);
                        // Refresh setting the right template for the property pane
                        return [4 /*yield*/, this._getTemplateContent()];
                    case 1:
                        // Refresh setting the right template for the property pane
                        _a.sent();
                        // Refreshes the web part manually because custom fields don't update since sp-webpart-base@1.1.1
                        // https://github.com/SharePoint/sp-dev-docs/issues/594
                        if (!this.disableReactivePropertyChanges) {
                            // The render has to be completed before the property pane to refresh to set up the correct property value
                            // so the property pane field will use the correct value for future edit
                            this.render();
                            this.context.propertyPane.refresh();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //concept from https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-search-refiners
    RssReaderWebPart.prototype.loadPropertyPaneResources = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, import(
                            /* webpackChunkName: 'search-property-pane' */
                            '../../controls/PropertyPaneTextDialog/PropertyPaneTextDialog')];
                    case 1:
                        _a._propertyPage = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Step 1: Set general feed properties including feed location, method to retrieve feed, and caching (local storage)
     */
    RssReaderWebPart.prototype._getFeedSettingsFields = function () {
        // Options for the feed service options
        var feedServiceOptions = [
            {
                text: strings.DefaultFeedServiceOption,
                key: FeedServiceOption.Default,
                checked: this.properties.feedService === FeedServiceOption.Default || !this.properties.feedService
            },
            {
                text: strings.Feed2JsonFeedServiceOption,
                key: FeedServiceOption.Feed2Json,
                checked: this.properties.feedService === FeedServiceOption.Feed2Json
            },
            {
                text: strings.Rss2JsonFeedServiceOption,
                key: FeedServiceOption.Rss2Json,
                checked: this.properties.feedService === FeedServiceOption.Rss2Json
            }
        ];
        // Sets up styling fields
        var feedFields = [
            PropertyPaneTextField('feedUrl', {
                label: strings.FeedUrlLabel
            }),
            PropertyPaneChoiceGroup('feedService', {
                label: strings.FeedServiceLabel,
                options: feedServiceOptions
            })
        ];
        if (this.properties.feedService == FeedServiceOption.Feed2Json) {
            feedFields.push(PropertyPaneTextField('feedServiceUrl', {
                label: strings.FeedServiceUrlLabel,
                description: strings.FeedServiceUrlDescription
            }));
        }
        if (this.properties.feedService == FeedServiceOption.Rss2Json) {
            feedFields.push(PropertyPaneTextField('feedServiceApiKey', {
                label: strings.FeedServiceApiKeyLabel,
                description: strings.FeedServiceApiKeyDescription
            }));
        }
        feedFields.push(PropertyPaneHorizontalRule());
        feedFields.push(PropertyPaneSlider('maxCount', {
            label: strings.MaxCountLabel,
            min: 1,
            max: 100,
            step: 1
        }));
        feedFields.push(PropertyPaneHorizontalRule());
        feedFields.push(PropertyPaneToggle('cacheResults', {
            label: strings.CacheResultsLabel,
            checked: this.properties.cacheResults,
        }));
        // if we want to include a search box, more parameters required
        if (this.properties.cacheResults) {
            feedFields.push(PropertyPaneSlider('cacheResultsMinutes', {
                label: strings.CacheResultsMinutesLabel,
                max: 1440,
                min: 5,
                showValue: true,
                step: 5,
                value: this.properties.cacheResultsMinutes,
            }));
            feedFields.push(PropertyPaneTextField('cacheStorageKeyPrefix', {
                label: strings.CacheStorageKeyPrefixLabel,
                description: strings.CacheStorageKeyPrefixDescription
            }));
        }
        feedFields.push(PropertyPaneHorizontalRule());
        feedFields.push(PropertyPaneTextField('feedLoadingLabel', {
            label: strings.FeedLoadingLabel,
            placeholder: strings.DefaultFeedLoadingLabel
        }));
        return feedFields;
    };
    /**
     * Step 1B: Set feed cors settings
     */
    RssReaderWebPart.prototype._getCorsSettingsFields = function () {
        // Sets up styling fields
        var feedFields = [
            PropertyPaneToggle('useCorsProxy', {
                label: strings.UseCorsProxyLabel,
                checked: this.properties.useCorsProxy,
            })
        ];
        if (this.properties.useCorsProxy) {
            feedFields.push(PropertyPaneTextField('corsProxyUrl', {
                label: strings.CorsProxyUrlLabel,
                description: strings.CorsProxyUrlDescription
            }));
        }
        else {
            feedFields.push(PropertyPaneToggle('disableCorsMode', {
                label: strings.DisableCorsModeLabel,
                checked: this.properties.disableCorsMode,
            }));
            feedFields.push(PropertyPaneLabel('disableCorsMode', {
                text: this.properties.disableCorsMode ? strings.DisableCorsModeSelectedDescription : strings.DisableCorsModeDescription
            }));
        }
        return feedFields;
    };
    /**
     * Step 2: Set feed layout settings
     */
    RssReaderWebPart.prototype._getLayoutSettingsFields = function () {
        // Options for the search results layout
        var layoutOptions = [
            {
                iconProps: {
                    officeFabricIconFontName: 'List'
                },
                text: strings.DefaultFeedLayoutOption,
                key: FeedLayoutOption.Default,
                checked: this.properties.selectedLayout === FeedLayoutOption.Default
            },
            {
                iconProps: {
                    officeFabricIconFontName: 'Code'
                },
                text: strings.CustomFeedLayoutOption,
                key: FeedLayoutOption.Custom,
                checked: this.properties.selectedLayout === FeedLayoutOption.Custom
            }
        ];
        var canEditTemplate = this.properties.externalTemplateUrl && this.properties.selectedLayout === FeedLayoutOption.Custom ? false : true;
        // Sets up styling fields
        var layoutFields = [
            PropertyPaneChoiceGroup('selectedLayout', {
                label: strings.SelectedLayoutLabel,
                options: layoutOptions
            })
        ];
        if (this.properties.selectedLayout === FeedLayoutOption.Custom) {
            layoutFields.push(new this._propertyPage.PropertyPaneTextDialog('inlineTemplateText', {
                dialogTextFieldValue: this._templateContentToDisplay,
                onPropertyChange: this._onCustomPropertyPaneChange.bind(this),
                disabled: !canEditTemplate,
                strings: {
                    cancelButtonText: strings.CancelButtonText,
                    dialogButtonLabel: strings.DialogButtonLabel,
                    dialogButtonText: strings.DialogButtonText,
                    dialogTitle: strings.DialogTitle,
                    saveButtonText: strings.SaveButtonText
                }
            }));
            layoutFields.push(PropertyPaneTextField('externalTemplateUrl', {
                label: strings.TemplateUrlLabel,
                placeholder: strings.TemplateUrlPlaceholder,
                deferredValidationTime: 500,
                onGetErrorMessage: this._onTemplateUrlChange.bind(this)
            }));
        }
        //default layout
        if (this.properties.selectedLayout === FeedLayoutOption.Default) {
            layoutFields.push(PropertyPaneHorizontalRule());
            layoutFields.push(PropertyPaneTextField('feedViewAllLink', {
                label: strings.FeedViewAllLinkLabel,
                placeholder: strings.FeedViewAllLinkPlaceholder
            }));
            layoutFields.push(PropertyPaneTextField('feedViewAllLinkLabel', {
                label: strings.FeedViewAllLinkLabelLabel,
                placeholder: strings.DefaultFeedViewAllLinkLabel
            }));
            layoutFields.push(PropertyPaneToggle('showPubDate', {
                label: strings.ShowPubDateLabel
            }));
            layoutFields.push(PropertyPaneToggle('showDesc', {
                label: strings.ShowDescLabel
            }));
            layoutFields.push(PropertyPaneSlider('descCharacterLimit', {
                label: strings.DescCharacterLimitLabel,
                min: 1,
                max: 500,
                step: 1
            }));
            layoutFields.push(PropertyPaneTextField('titleLinkTarget', {
                label: strings.TitleLinkTargetLabel
            }));
            layoutFields.push(PropertyPaneTextField('dateFormat', {
                label: strings.DateFormatLabel
            }));
            layoutFields.push(PropertyPaneHorizontalRule());
            layoutFields.push(PropertyFieldColorPicker('fontColor', {
                label: strings.FontColorLabel,
                selectedColor: this.properties.fontColor,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Full,
                iconName: 'Precipitation',
                key: 'rssReaderFontColorField'
            }));
            layoutFields.push(PropertyFieldColorPicker('backgroundColor', {
                label: strings.BackgroundColorLabel,
                selectedColor: this.properties.backgroundColor,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Full,
                iconName: 'Precipitation',
                key: 'rssReaderBgColorField'
            }));
            /*
            dateFormatLang: string;
            */
        }
        return layoutFields;
    };
    /**
     * Custom handler when the external template file URL
     * from https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-search-refiners
     * @param value the template file URL value
     */
    RssReaderWebPart.prototype._onTemplateUrlChange = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!isEmpty(value)) return [3 /*break*/, 1];
                        // Doesn't raise any error if file is empty (otherwise error message will show on initial load...)
                        return [2 /*return*/, ''];
                    case 1:
                        if (!!TemplateService.isValidTemplateFile(value)) return [3 /*break*/, 2];
                        // Resolves an error if the file isn't a valid .htm or .html file
                        return [2 /*return*/, strings.ErrorTemplateExtension];
                    case 2:
                        console.log("attempt to resolve");
                        // Resolves an error if the file doesn't answer a simple head request
                        return [4 /*yield*/, this._templateService.ensureFileResolves(value)];
                    case 3:
                        // Resolves an error if the file doesn't answer a simple head request
                        _a.sent();
                        return [2 /*return*/, ''];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        return [2 /*return*/, Text.format(strings.ErrorTemplateResolve, error_1)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the correct results template content according to the property pane current configuration
     * @returns the template content as a string
     */
    RssReaderWebPart.prototype._getTemplateContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var templateContent, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        templateContent = null;
                        _a = this.properties.selectedLayout;
                        switch (_a) {
                            case FeedLayoutOption.Default: return [3 /*break*/, 1];
                            case FeedLayoutOption.Custom: return [3 /*break*/, 2];
                        }
                        return [3 /*break*/, 6];
                    case 1:
                        templateContent = TemplateService.getListDefaultTemplate();
                        return [3 /*break*/, 7];
                    case 2:
                        if (!this.properties.externalTemplateUrl) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._templateService.getFileContent(this.properties.externalTemplateUrl)];
                    case 3:
                        templateContent = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        templateContent = this.properties.inlineTemplateText ? this.properties.inlineTemplateText : TemplateService.getBlankDefaultTemplate();
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6: return [3 /*break*/, 7];
                    case 7:
                        this._templateContentToDisplay = templateContent;
                        return [2 /*return*/];
                }
            });
        });
    };
    return RssReaderWebPart;
}(BaseClientSideWebPart));
export default RssReaderWebPart;
//# sourceMappingURL=RssReaderWebPart.js.map