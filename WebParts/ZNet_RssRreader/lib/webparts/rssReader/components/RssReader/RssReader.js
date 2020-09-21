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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import * as React from 'react';
import Moment from 'react-moment';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { List } from 'office-ui-fabric-react/lib/List';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as strings from 'RssReaderWebPartStrings';
import styles from './RssReader.module.scss';
import { RssResultsTemplate } from '../Layouts';
import { RssReaderService } from '../../../../services/RssReaderService';
import { FeedLayoutOption } from '../../../../models';
var RssReader = (function (_super) {
    __extends(RssReader, _super);
    function RssReader(props) {
        var _this = _super.call(this, props) || this;
        _this.viewAllLinkLabel = strings.DefaultFeedViewAllLinkLabel;
        _this.feedLoadingLabel = strings.DefaultFeedLoadingLabel;
        //override default label values if needed
        if (_this.props.feedViewAllLinkLabel && _this.props.feedViewAllLinkLabel.length > 0) {
            _this.viewAllLinkLabel = _this.props.feedViewAllLinkLabel;
        }
        if (_this.props.feedLoadingLabel && _this.props.feedLoadingLabel.length > 0) {
            _this.feedLoadingLabel = _this.props.feedLoadingLabel;
        }
        _this.state = {
            rssFeedReady: false,
            rssFeed: {},
            rssFeedError: ''
        };
        //load the rss feed
        _this.loadRssFeed();
        return _this;
    }
    RssReader.prototype.render = function () {
        return (React.createElement("div", { className: styles.rssReader },
            React.createElement("div", { className: styles.rssReaderHeader },
                React.createElement(WebPartTitle, { displayMode: this.props.displayMode, title: this.props.title, updateProperty: this.props.updateProperty }),
                this.state.rssFeedReady && this.state.rssFeed && this.props.feedViewAllLink && this.props.feedViewAllLink.length > 0 && (React.createElement("div", { className: styles.rssReaderListViewAll },
                    React.createElement("a", { href: this.props.feedViewAllLink }, this.viewAllLinkLabel)))),
            !this.props.feedUrl || this.props.feedUrl.length < 1 ? (React.createElement(Placeholder, { iconName: 'Edit', iconText: 'Configure your web part', description: 'Please configure the web part.', buttonLabel: 'Configure', onConfigure: this._onConfigure })) : (React.createElement("div", null, !this.state.rssFeedReady ? (React.createElement("div", null, this.state.rssFeedError ? (React.createElement("div", { className: styles.messageError },
                React.createElement(Icon, { iconName: "Warning", className: styles.messageErrorIcon }),
                React.createElement(Label, { className: styles.messageErrorLabel }, strings.RssLoadError + ' - ' + this.state.rssFeedError))) : (React.createElement(Spinner, { size: SpinnerSize.large, label: this.feedLoadingLabel })))) : (React.createElement("div", null, this.state.rssFeed ? (React.createElement("div", null,
                this.props.selectedLayout == FeedLayoutOption.Default && (React.createElement(List, { className: styles.rssReaderList + (this.props.backgroundColor ? " " + styles.rssReaderListPadding : ""), items: this.state.rssFeed.query.results.rss, onRenderCell: this._onRenderListRow, style: this.props.backgroundColor ? { backgroundColor: this.props.backgroundColor } : {} })),
                this.props.selectedLayout == FeedLayoutOption.Custom && (React.createElement("div", null,
                    React.createElement(RssResultsTemplate, { templateService: this.props.templateService, templateContent: this.props.templateContent, templateContext: {
                            items: this.state.rssFeed.query.results.rss,
                            totalItemCount: this.state.rssFeedReady ? this.state.rssFeed.query.count : 0,
                            returnedItemCount: this.state.rssFeedReady ? this.state.rssFeed.query.results.rss.length : 0,
                            strings: strings,
                        } }))))) : (React.createElement("div", null,
                React.createElement(Spinner, { size: SpinnerSize.large, label: strings.NoReturnedFeed })))))))));
    };
    RssReader.prototype.componentDidUpdate = function (nextProps) {
        //if specific resources change, we need to reload feed
        if (this.props.feedUrl != nextProps.feedUrl ||
            this.props.feedService != nextProps.feedService ||
            this.props.feedServiceApiKey != nextProps.feedServiceApiKey ||
            this.props.feedServiceUrl != nextProps.feedServiceUrl ||
            this.props.useCorsProxy != nextProps.useCorsProxy ||
            this.props.corsProxyUrl != nextProps.corsProxyUrl ||
            this.props.disableCorsMode != nextProps.disableCorsMode ||
            this.props.maxCount != nextProps.maxCount ||
            this.props.selectedLayout != nextProps.selectedLayout ||
            this.props.externalTemplateUrl != nextProps.externalTemplateUrl ||
            this.props.inlineTemplateText != nextProps.inlineTemplateText ||
            this.props.showDesc != nextProps.showDesc ||
            this.props.showPubDate != nextProps.showPubDate ||
            this.props.descCharacterLimit != nextProps.descCharacterLimit ||
            this.props.titleLinkTarget != nextProps.titleLinkTarget ||
            this.props.dateFormat != nextProps.dateFormat ||
            this.props.backgroundColor != nextProps.backgroundColor ||
            this.props.fontColor != nextProps.fontColor) {
            this.loadRssFeed();
        }
        if (this.props.feedViewAllLinkLabel != nextProps.feedViewAllLinkLabel) {
            this.viewAllLinkLabel = this.props.feedViewAllLinkLabel;
        }
        if (this.props.feedLoadingLabel != nextProps.feedLoadingLabel) {
            this.feedLoadingLabel = this.props.feedLoadingLabel;
        }
    };
    RssReader.prototype._onConfigure = function () {
        this.props.propertyPane.open();
    };
    RssReader.prototype.decodeHtml = function (html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };
    /*
      _onReaderListRow used by Default feed Layout
    */
    RssReader.prototype._onRenderListRow = function (item, index) {
        var thisItem = item.channel.item;
        //may need to strip html from description
        var displayDesc = thisItem.description;
        var div = document.createElement("div");
        div.innerHTML = displayDesc;
        displayDesc = (div.textContent || div.innerText || "").replace(/\&nbsp;/ig, "").trim();
        return (React.createElement("div", { className: styles.rssReaderListItem, "data-is-focusable": true },
            React.createElement("div", { className: styles.itemTitle },
                React.createElement(Link, { href: thisItem.link, target: this.props.titleLinkTarget ? this.props.titleLinkTarget : "_self", style: this.props.fontColor ? { color: this.props.fontColor } : {} }, this.decodeHtml(thisItem.title))),
            this.props.showPubDate && (React.createElement("div", { className: styles.itemDate }, this.props.dateFormat && this.props.dateFormat.length > 0 ? (React.createElement(Moment, { format: this.props.dateFormat, date: thisItem.pubDate })) : (React.createElement("div", null, (new Date(thisItem.pubDate)).toLocaleDateString())))),
            this.props.showDesc && (React.createElement("div", { className: styles.itemContent }, this.props.descCharacterLimit && (displayDesc.length > this.props.descCharacterLimit) ? (React.createElement("div", null, displayDesc.substring(0, this.props.descCharacterLimit) + '...')) :
                (React.createElement("div", null, displayDesc))))));
    };
    /*
    load a rss feed based on properties
    */
    RssReader.prototype.loadRssFeed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rssReaderService, feedRequest, rssFeed, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.props.feedUrl && this.props.feedUrl.length > 0)) return [3 /*break*/, 4];
                        //always reset set
                        this.setState({ rssFeedReady: false, rssFeed: null });
                        rssReaderService = new RssReaderService();
                        feedRequest = {};
                        feedRequest.url = this.props.feedUrl;
                        feedRequest.feedService = this.props.feedService;
                        feedRequest.feedServiceApiKey = this.props.feedServiceApiKey;
                        feedRequest.feedServiceUrl = this.props.feedServiceUrl;
                        //cors
                        feedRequest.useCorsProxy = this.props.useCorsProxy;
                        if (this.props.useCorsProxy) {
                            feedRequest.corsProxyUrl = this.props.corsProxyUrl;
                        }
                        feedRequest.disableCorsMode = this.props.disableCorsMode;
                        feedRequest.maxCount = this.props.maxCount;
                        //local storage / caching
                        feedRequest.useLocalStorage = this.props.cacheResults;
                        if (this.props.cacheResults) {
                            feedRequest.useLocalStorageTimeout = this.props.cacheResultsMinutes;
                            feedRequest.useLocalStorageKeyPrefix = this.props.cacheStorageKeyPrefix;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rssReaderService.getFeed(feedRequest)];
                    case 2:
                        rssFeed = _a.sent();
                        if (rssFeed && rssFeed.query && rssFeed.query.results) {
                            this.setState({
                                rssFeedReady: true,
                                rssFeed: rssFeed,
                                rssFeedError: ""
                            });
                        }
                        else {
                            this.setState({
                                rssFeedReady: true,
                                rssFeed: null,
                                rssFeedError: strings.ErrorNoResults
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.setState({
                            rssFeedReady: false,
                            rssFeed: null,
                            rssFeedError: error_1
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        autobind
    ], RssReader.prototype, "_onConfigure", null);
    __decorate([
        autobind
    ], RssReader.prototype, "_onRenderListRow", null);
    return RssReader;
}(React.Component));
export default RssReader;
//# sourceMappingURL=RssReader.js.map