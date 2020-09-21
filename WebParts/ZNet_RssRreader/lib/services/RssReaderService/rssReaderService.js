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
import * as strings from 'RssReaderWebPartStrings';
import { RssHttpClientDirectService, RssHttpClientFeed2JsonService, RssHttpClientRss2JsonService } from '../RssHttpClientService';
import { FeedServiceOption } from '../../models';
import { LocalStorageService } from '../../services/LocalStorageService';
var RssReaderService = (function () {
    function RssReaderService() {
    }
    /*
    given a feedRequest, determine the specific local storage keyname
    */
    RssReaderService.getFeedStorageKeyName = function (feedRequest) {
        var keyName = feedRequest.url + "_" + feedRequest.maxCount;
        return keyName;
    };
    /*
    given a feedRequest, determine the specific local storage key prefix to be added to the keyname hash
    */
    RssReaderService.getFeedStorageKeyPrefix = function (feedRequest) {
        var keyPrefix = ((feedRequest.useLocalStorageKeyPrefix && feedRequest.useLocalStorageKeyPrefix.length > 0) ? feedRequest.useLocalStorageKeyPrefix + "_" : "") + RssReaderService.storageKeyPrefix;
        return keyPrefix;
    };
    /*
    given a feedRequest, go and get the particular feed
    return a resolved IRssReaderResponse or reject message
    */
    RssReaderService.prototype.getFeed = function (feedRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var p;
            return __generator(this, function (_a) {
                p = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var localStorageService, localStorageKey, cachedResults, err_1, response, rssHttpClient, err_2, localStorageKeyValue, storedResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                localStorageService = new LocalStorageService();
                                if (!(feedRequest.useLocalStorage && feedRequest.useLocalStorageTimeout >= 0)) return [3 /*break*/, 4];
                                localStorageKey = {
                                    keyName: RssReaderService.getFeedStorageKeyName(feedRequest),
                                    keyPrefix: RssReaderService.getFeedStorageKeyPrefix(feedRequest),
                                    timeOutInMinutes: feedRequest.useLocalStorageTimeout
                                };
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, localStorageService.get(localStorageKey)];
                            case 2:
                                cachedResults = _a.sent();
                                if (cachedResults) {
                                    //appear to have valid cached results, resolve these
                                    try {
                                        resolve(cachedResults);
                                        return [2 /*return*/];
                                    }
                                    catch (err) {
                                        //we are going to ignore error as we will simply pull feed again
                                        console.log("rssReaderService: an error occurred attempting to convert cached results");
                                        console.log(err);
                                    }
                                }
                                return [3 /*break*/, 4];
                            case 3:
                                err_1 = _a.sent();
                                //we are going to ignore error as we will simply pull feed again
                                console.log("rssReaderService: an error occurred attempting to retrieve cached results");
                                console.log(err_1);
                                return [3 /*break*/, 4];
                            case 4:
                                response = null;
                                _a.label = 5;
                            case 5:
                                _a.trys.push([5, 8, , 9]);
                                //set up the http client service for each particular feed service
                                if (feedRequest.feedService == FeedServiceOption.Default) {
                                    rssHttpClient = new RssHttpClientDirectService();
                                }
                                else if (feedRequest.feedService == FeedServiceOption.Feed2Json) {
                                    rssHttpClient = new RssHttpClientFeed2JsonService();
                                }
                                else if (feedRequest.feedService == FeedServiceOption.Rss2Json) {
                                    rssHttpClient = new RssHttpClientRss2JsonService();
                                }
                                if (!rssHttpClient) return [3 /*break*/, 7];
                                return [4 /*yield*/, rssHttpClient.get(feedRequest)];
                            case 6:
                                response = _a.sent();
                                _a.label = 7;
                            case 7: return [3 /*break*/, 9];
                            case 8:
                                err_2 = _a.sent();
                                console.log("rssReaderService: error retrieving feed from service " + feedRequest.feedService);
                                console.log(err_2);
                                reject(err_2);
                                return [2 /*return*/];
                            case 9:
                                if (!response) return [3 /*break*/, 12];
                                if (!(feedRequest.useLocalStorage && feedRequest.useLocalStorageTimeout >= 0)) return [3 /*break*/, 11];
                                localStorageKeyValue = {
                                    keyName: RssReaderService.getFeedStorageKeyName(feedRequest),
                                    keyPrefix: RssReaderService.getFeedStorageKeyPrefix(feedRequest),
                                    keyValue: response
                                };
                                return [4 /*yield*/, localStorageService.set(localStorageKeyValue)];
                            case 10:
                                storedResult = _a.sent();
                                _a.label = 11;
                            case 11:
                                resolve(response);
                                return [3 /*break*/, 13];
                            case 12:
                                console.log("rssReaderService getFeed: Feed returned no results");
                                reject(strings.ErrorNoResults);
                                _a.label = 13;
                            case 13: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, p];
            });
        });
    };
    RssReaderService.storageKeyPrefix = 'rssFeed';
    return RssReaderService;
}());
export { RssReaderService };
//# sourceMappingURL=rssReaderService.js.map