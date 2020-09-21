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
import { html } from 'common-tags';
import * as Handlebars from 'handlebars';
import 'core-js/modules/es7.array.includes.js';
import 'core-js/modules/es6.string.includes.js';
import 'core-js/modules/es6.number.is-nan.js';
var BaseTemplateService = (function () {
    function BaseTemplateService() {
        this._helper = null;
        this.CurrentLocale = "en";
        // Registers all helpers
        this.registerTemplateServices();
    }
    BaseTemplateService.prototype.LoadHandlebarsHelpers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var component;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, import(
                        /* webpackChunkName: 'search-handlebars-helpers' */
                        'handlebars-helpers')];
                    case 1:
                        component = _a.sent();
                        this._helper = component({
                            handlebars: Handlebars
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets the default Handlebars list item template used in list layout
     * @returns the template HTML markup
     */
    BaseTemplateService.getListDefaultTemplate = function () {
        return (_a = ["\n<div class=\"template_root\">\n    <div class=\"template_rss_list\">\n        {{#each items as |item|}}\n            <div class=\"listItem\">\n                <div class=\"itemTitle\">\n                    <a href=\"{{channel/item/link}}\" target=\"_blank\">{{channel/item/title}}</a>\n                </div>\n                <div class=\"itemDate\">\n                    {{getDate channel/item/pubDate \"MM/DD/YYYY\"}}\n                </div>\n                <div class=\"itemContent\">\n                    {{{getShortText channel/item/description 100 true}}}\n                </div>\n            </div>\n        {{/each}}\n    </div>\n</div>\n        "], _a.raw = ["\n<div class=\"template_root\">\n    <div class=\"template_rss_list\">\n        {{#each items as |item|}}\n            <div class=\"listItem\">\n                <div class=\"itemTitle\">\n                    <a href=\"{{channel/item/link}}\" target=\"_blank\">{{channel/item/title}}</a>\n                </div>\n                <div class=\"itemDate\">\n                    {{getDate channel/item/pubDate \"MM/DD/YYYY\"}}\n                </div>\n                <div class=\"itemContent\">\n                    {{{getShortText channel/item/description 100 true}}}\n                </div>\n            </div>\n        {{/each}}\n    </div>\n</div>\n        "], html(_a));
        var _a;
    };
    /**
     * Gets the default Handlebars custom blank item template
     * @returns the template HTML markup
     */
    BaseTemplateService.getBlankDefaultTemplate = function () {
        return "\n<style>\n    /* Insert your CSS here */\n</style>\n\n<div class=\"template_root\">\n    <div class=\"template_rss_tileList\">\n        <div class=\"ms-Grid\">\n            <div class=\"ms-Grid-row\">\n                {{#each items as |item|}}\n                    <div class=\"ms-Grid-col ms-sm12 ms-md6 ms-lg6\">\n                        <div class=\"singleCard\" onClick=\"window.location = '{{channel/item/link}}'; return false;\">\n                            <div class=\"ms-Grid\">\n                                <div class=\"ms-Grid-row\">\n                                    <div class=\"ms-Grid-col ms-sm12\">\n                                        <span class=\"primaryText\"><a href=\"{{channel/item/link}}\">{{channel/item/title}}</a></span>\n                                        <span class=\"secondaryText\">{{{getShortText channel/item/description 100 true}}}</span>\n                                        <span class=\"dateText\">{{getDate channel/item/pubDate \"MM/DD/YYYY\"}}</span>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                {{/each}}\n            </div>\n\n            <div class=\"template_resultCount\">\n                <label class=\"ms-fontWeight-normal\">Total items: {{returnedItemCount}}</label>\n            </div>\n        </div>\n    </div>\n</div>\n        ";
    };
    /**
     * Registers useful helpers for search results templates
     */
    BaseTemplateService.prototype.registerTemplateServices = function () {
        var _this = this;
        // Return the URL or Title part of a URL automatic managed property
        // <p>{{getUrlField MyLinkOWSURLH "Title"}}</p>
        Handlebars.registerHelper("getUrlField", function (urlField, value) {
            var separatorPos = urlField.indexOf(",");
            if (value === "URL") {
                return urlField.substr(0, separatorPos);
            }
            return urlField.substr(separatorPos + 1).trim();
        });
        // Return the formatted date according to current locale using moment.js
        // <p>{{getDate Created "LL"}}</p>
        Handlebars.registerHelper("getDate", function (date, format) {
            try {
                var d = _this._helper.moment(date, format, { lang: _this.CurrentLocale, datejs: false });
                return d;
            }
            catch (error) {
                return;
            }
        });
        // Get the first maxLength characters from a string
        // <p>{{getShortText Description 100}}</p>
        Handlebars.registerHelper("getShortText", function (inputString, maxLength, ignoreHtml) {
            if (!inputString || inputString.length < 1) {
                return "";
            }
            //remove Html tags if necessary
            if (ignoreHtml) {
                var div = document.createElement("div");
                div.innerHTML = inputString;
                inputString = (div.textContent || div.innerText || "").replace(/\&nbsp;/ig, "").trim();
            }
            if (inputString.length < maxLength) {
                return inputString;
            }
            else {
                return inputString.substr(0, maxLength).trim() + "...";
            }
        });
    };
    /**
     * Compile the specified Handlebars template with the associated context object¸
     * @returns the compiled HTML template string
     */
    BaseTemplateService.prototype.processTemplate = function (templateContext, templateContent) {
        return __awaiter(this, void 0, void 0, function () {
            var handlebarFunctionNames, i, element, regEx, template, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handlebarFunctionNames = [
                            "getDate",
                            "after",
                            "arrayify",
                            "before",
                            "eachIndex",
                            "filter",
                            "first",
                            "forEach",
                            "inArray",
                            "isArray",
                            "itemAt",
                            "join",
                            "last",
                            "lengthEqual",
                            "map",
                            "some",
                            "sort",
                            "sortBy",
                            "withAfter",
                            "withBefore",
                            "withFirst",
                            "withGroup",
                            "withLast",
                            "withSort",
                            "embed",
                            "gist",
                            "jsfiddle",
                            "isEmpty",
                            "iterate",
                            "length",
                            "and",
                            "compare",
                            "contains",
                            "gt",
                            "gte",
                            "has",
                            "eq",
                            "ifEven",
                            "ifNth",
                            "ifOdd",
                            "is",
                            "isnt",
                            "lt",
                            "lte",
                            "neither",
                            "or",
                            "unlessEq",
                            "unlessGt",
                            "unlessLt",
                            "unlessGteq",
                            "unlessLteq",
                            "moment",
                            "fileSize",
                            "read",
                            "readdir",
                            "css",
                            "ellipsis",
                            "js",
                            "sanitize",
                            "truncate",
                            "ul",
                            "ol",
                            "thumbnailImage",
                            "i18n",
                            "inflect",
                            "ordinalize",
                            "info",
                            "bold",
                            "warn",
                            "error",
                            "debug",
                            "_inspect",
                            "markdown",
                            "md",
                            "mm",
                            "match",
                            "isMatch",
                            "add",
                            "subtract",
                            "divide",
                            "multiply",
                            "floor",
                            "ceil",
                            "round",
                            "sum",
                            "avg",
                            "default",
                            "option",
                            "noop",
                            "withHash",
                            "addCommas",
                            "phoneNumber",
                            "random",
                            "toAbbr",
                            "toExponential",
                            "toFixed",
                            "toFloat",
                            "toInt",
                            "toPrecision",
                            "extend",
                            "forIn",
                            "forOwn",
                            "toPath",
                            "get",
                            "getObject",
                            "hasOwn",
                            "isObject",
                            "merge",
                            "JSONparse",
                            "parseJSON",
                            "pick",
                            "JSONstringify",
                            "stringify",
                            "absolute",
                            "dirname",
                            "relative",
                            "basename",
                            "stem",
                            "extname",
                            "segments",
                            "camelcase",
                            "capitalize",
                            "capitalizeAll",
                            "center",
                            "chop",
                            "dashcase",
                            "dotcase",
                            "hyphenate",
                            "isString",
                            "lowercase",
                            "occurrences",
                            "pascalcase",
                            "pathcase",
                            "plusify",
                            "reverse",
                            "replace",
                            "sentence",
                            "snakecase",
                            "split",
                            "startsWith",
                            "titleize",
                            "trim",
                            "uppercase",
                            "encodeURI",
                            "decodeURI",
                            "urlResolve",
                            "urlParse",
                            "stripQuerystring",
                            "stripProtocol"
                        ];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < handlebarFunctionNames.length)) return [3 /*break*/, 4];
                        element = handlebarFunctionNames[i];
                        regEx = new RegExp("{{#?.*?" + element + ".*?}}", "m");
                        if (!regEx.test(templateContent)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.LoadHandlebarsHelpers()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        template = Handlebars.compile(templateContent);
                        result = template(templateContext);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Verifies if the template fiel path is correct
     * @param filePath the file path string
     */
    BaseTemplateService.isValidTemplateFile = function (filePath) {
        var path = filePath.toLowerCase().trim();
        var pathExtension = path.substring(path.lastIndexOf('.'));
        return (pathExtension == '.htm' || pathExtension == '.html');
    };
    return BaseTemplateService;
}());
export default BaseTemplateService;
//# sourceMappingURL=BaseTemplateService.js.map