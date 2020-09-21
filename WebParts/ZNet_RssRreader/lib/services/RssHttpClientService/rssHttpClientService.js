/* based on MSGraph class by Mikael Svenson:
https://www.techmikael.com/2018/09/example-of-wrapper-to-ease-usage-of.html
*/
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
import { HttpClient } from '@microsoft/sp-http';
var RssHttpClientService = (function () {
    function RssHttpClientService() {
    }
    /*
    initialize the static class
    */
    RssHttpClientService.init = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //obtain the httpClient from the webpart context
                        _a = this;
                        return [4 /*yield*/, context.httpClient];
                    case 1:
                        //obtain the httpClient from the webpart context
                        _a._httpClient = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
    given a url, make a get request to a given url, expecting json in response
    Will assume response is only text and will be returned as such
    */
    RssHttpClientService.getRssJson = function (url, corsProxyUrl, disableCors) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var p;
            return __generator(this, function (_a) {
                p = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var requestHeaders, requestGetOptions, query;
                    return __generator(this, function (_a) {
                        requestHeaders = new Headers();
                        //if Cors is disabled, then we must send a simple Accept type
                        if (!disableCors) {
                            requestHeaders.append('Accept', 'application/json');
                        }
                        else {
                            requestHeaders.append('Accept', 'text/plain');
                        }
                        requestGetOptions = {
                            method: "GET",
                            headers: requestHeaders,
                            mode: !disableCors ? "cors" : "no-cors"
                        };
                        query = this._httpClient.fetch(corsProxyUrl ? RssHttpClientService.processCorsProxyUrl(url, corsProxyUrl) : url, HttpClient.configurations.v1, requestGetOptions)
                            .then(function (response) {
                            //get the response based on expected type
                            if (!disableCors) {
                                return response.json();
                            }
                            else {
                                return response.text();
                            }
                        })
                            .then(function (data) {
                            if (!disableCors) {
                                resolve(data);
                            }
                            else {
                                //expected response is actually json, thus attempt to parse response into json
                                resolve(JSON.parse(data));
                            }
                        })
                            .catch(function (error) {
                            console.error(error);
                            reject(error);
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/, p];
            });
        });
    };
    /*
    given a url, make a get request to a given url
    Will assume response is only text and will be returned as such
    */
    RssHttpClientService.getRssXml = function (url, corsProxyUrl, disableCors) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var p;
            return __generator(this, function (_a) {
                p = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var requestHeaders, requestGetOptions, query;
                    return __generator(this, function (_a) {
                        requestHeaders = new Headers();
                        requestHeaders.append('Accept', 'text/xml; application/xml');
                        requestGetOptions = {
                            method: "GET",
                            headers: requestHeaders,
                            mode: !disableCors ? "cors" : "no-cors"
                        };
                        query = this._httpClient.fetch(corsProxyUrl ? RssHttpClientService.processCorsProxyUrl(url, corsProxyUrl) : url, HttpClient.configurations.v1, requestGetOptions)
                            .then(function (response) {
                            return response.text();
                        })
                            .then(function (data) {
                            resolve(data);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/, p];
            });
        });
    };
    /*
    given a feed url and the proxy url, replace proxy url token(s)
    {0} will be replaced with url
    */
    RssHttpClientService.processCorsProxyUrl = function (url, corsProxyUrl) {
        if (!url || !corsProxyUrl) {
            return "";
        }
        //replace {0} with the feed Url
        return corsProxyUrl.replace(/\{0\}/ig, url);
    };
    return RssHttpClientService;
}());
export { RssHttpClientService };
//# sourceMappingURL=rssHttpClientService.js.map