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
import { RssHttpClientService } from './';
var RssHttpClientFeed2JsonService = (function () {
    function RssHttpClientFeed2JsonService() {
    }
    RssHttpClientFeed2JsonService.prototype.get = function (feedRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var p;
            return __generator(this, function (_a) {
                p = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var rawFeedOutput, response, rssUrl, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                rawFeedOutput = null;
                                response = null;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                rssUrl = (feedRequest.feedServiceUrl ? feedRequest.feedServiceUrl : "https://feed2json.org/convert") + "?url=" + feedRequest.url;
                                return [4 /*yield*/, RssHttpClientService.getRssJson(rssUrl, feedRequest.useCorsProxy ? feedRequest.corsProxyUrl : "", feedRequest.disableCorsMode)];
                            case 2:
                                rawFeedOutput = _a.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                err_1 = _a.sent();
                                console.log("RssHttpClientFeed2JsonService.get: error retrieving feed");
                                console.log(err_1);
                                reject(err_1 + " - " + strings.ErrorPossibleCORSBlock);
                                return [2 /*return*/];
                            case 4:
                                //at this point, we need to now process the raw resutls and turn them into a valid response
                                if (rawFeedOutput) {
                                    try {
                                        response = this.convertRssFeedToRssReaderResponse(rawFeedOutput, feedRequest.maxCount);
                                        resolve(response);
                                    }
                                    catch (err) {
                                        reject(strings.ErrorCovertFeedInvalidSource);
                                    }
                                }
                                //if here, an error occurred
                                reject(strings.ErrorPossibleCORBBlock);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, p];
            });
        });
    };
    RssHttpClientFeed2JsonService.prototype.convertRssFeedToRssReaderResponse = function (input, maxCount) {
        var response = { query: null };
        if (!input) {
            return null;
        }
        response.query = {
            //set up feed header
            count: input.items ? input.items.length : 0,
            created: (new Date()).toDateString(),
            lang: "",
            meta: {
                url: {
                    id: input.home_page_url,
                    status: input.name,
                    headers: {
                        header: [
                            {
                                name: input.description
                            }
                        ]
                    }
                },
            },
            results: null
        };
        //feed items
        if (input.items) {
            response.query.results = {
                rss: []
            };
            input.items.map(function (item) {
                var newItem = {};
                newItem.channel = {};
                newItem.channel.item = {};
                newItem.channel.item.title = item.title;
                newItem.channel.item.link = item.url;
                newItem.channel.item.description = item.content_html;
                newItem.channel.item.pubDate = item.date_published;
                newItem.channel.item.creator = (item.author && item.author.name) ? item.author.name : "";
                newItem.channel.item.date = item.date_published;
                newItem.channel.item.guid = {
                    isPermaLink: "true",
                    content: item.guid
                };
                response.query.results.rss.push(newItem);
            });
            //ensure that we only get maxCount records
            if (response.query.results.rss.length > maxCount) {
                response.query.results.rss = response.query.results.rss.splice(0, maxCount);
            }
        }
        return response;
    };
    return RssHttpClientFeed2JsonService;
}());
export { RssHttpClientFeed2JsonService };
//# sourceMappingURL=rssHttpClientFeed2JsonService.js.map