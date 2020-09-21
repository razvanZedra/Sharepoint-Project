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
//rssParser inspired by rss-parser node package
import { Parser } from 'xml2js';
import { Utils } from './utils';
import { Fields } from './fields';
var RssXmlParserService = (function () {
    function RssXmlParserService() {
    }
    RssXmlParserService.init = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                options.headers = options.headers || {};
                options.customFields = options.customFields || {};
                options.customFields.item = options.customFields.item || [];
                options.customFields.feed = options.customFields.feed || [];
                if (!options.maxRedirects)
                    options.maxRedirects = this.DEFAULT_MAX_REDIRECTS;
                if (!options.timeout)
                    options.timeout = this.DEFAULT_TIMEOUT;
                this.options = options;
                return [2 /*return*/];
            });
        });
    };
    RssXmlParserService.parse = function (xmlFeed, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var p;
            return __generator(this, function (_a) {
                p = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var xmlParser;
                    return __generator(this, function (_a) {
                        //ensure that we have some options
                        options = options ? options : {};
                        xmlParser = new Parser({ explicitArray: false });
                        //parse the xml
                        xmlParser.parseString(xmlFeed, function (err, result) {
                            //console.log("parser called");
                            //console.log(result);
                            if (err)
                                return reject(err);
                            if (!result) {
                                return reject(new Error('Unable to parse XML.'));
                            }
                            var feed = null;
                            if (result.feed) {
                                feed = _this.buildAtomFeed(result);
                            }
                            else if (result.rss && result.rss.$ && result.rss.$.version && result.rss.$.version.match(/^2/)) {
                                feed = _this.buildRSS2(result);
                            }
                            else if (result['rdf:RDF']) {
                                feed = _this.buildRSS1(result);
                            }
                            else if (result.rss && result.rss.$ && result.rss.$.version && result.rss.$.version.match(/0\.9/)) {
                                feed = _this.buildRSS0_9(result);
                            }
                            else if (result.rss && options.defaultRSS) {
                                switch (options.defaultRSS) {
                                    case 0.9:
                                        feed = _this.buildRSS0_9(result);
                                        break;
                                    case 1:
                                        feed = _this.buildRSS1(result);
                                        break;
                                    case 2:
                                        feed = _this.buildRSS2(result);
                                        break;
                                    default:
                                        return reject(new Error("default RSS version not recognized."));
                                }
                            }
                            else {
                                return reject(new Error("Feed not recognized as RSS 1 or 2."));
                            }
                            resolve(feed);
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/, p];
            });
        });
    };
    RssXmlParserService.buildAtomFeed = function (xmlObj) {
        var _this = this;
        var feed = { items: [] };
        Utils.copyFromXML(xmlObj.feed, feed, this.options.customFields.feed);
        if (xmlObj.feed.link) {
            feed.link = Utils.getLink(xmlObj.feed.link, 'alternate', 0);
            feed.feedUrl = Utils.getLink(xmlObj.feed.link, 'self', 1);
        }
        if (xmlObj.feed.title) {
            var title = xmlObj.feed.title[0] || '';
            if (title._)
                title = title._;
            if (title)
                feed.title = title;
        }
        if (xmlObj.feed.updated) {
            feed.lastBuildDate = xmlObj.feed.updated[0];
        }
        (xmlObj.feed.entry || []).forEach(function (entry) {
            var item = {};
            Utils.copyFromXML(entry, item, _this.options.customFields.item);
            if (entry.title) {
                var title = entry.title[0] || '';
                if (title._) {
                    title = title._;
                }
                if (title) {
                    item.title = title;
                }
            }
            if (entry.link && entry.link.length) {
                item.link = Utils.getLink(entry.link, 'alternate', 0);
            }
            if (entry.published && entry.published.length && entry.published[0].length) {
                item.pubDate = new Date(entry.published[0]).toISOString();
            }
            if (!item.pubDate && entry.updated && entry.updated.length && entry.updated[0].length) {
                item.pubDate = new Date(entry.updated[0]).toISOString();
            }
            if (entry.author && entry.author.length) {
                item.author = entry.author[0].name[0];
            }
            if (entry.content && entry.content.length) {
                item.content = Utils.getContent(entry.content[0]);
                item.contentSnippet = Utils.getSnippet(item.content);
            }
            if (entry.id) {
                item.id = entry.id[0];
            }
            _this.setISODate(item);
            feed.items.push(item);
        });
        return feed;
    };
    RssXmlParserService.buildRSS0_9 = function (xmlObj) {
        var channel = xmlObj.rss.channel[0];
        var items = channel.item;
        return this.buildRSS(channel, items);
    };
    RssXmlParserService.buildRSS1 = function (xmlObj) {
        xmlObj = xmlObj['rdf:RDF'];
        var channel = xmlObj.channel[0];
        var items = xmlObj.item;
        return this.buildRSS(channel, items);
    };
    RssXmlParserService.buildRSS2 = function (xmlObj) {
        var channel = Array.isArray(xmlObj.rss.channel) ? xmlObj.rss.channel[0] : xmlObj.rss.channel;
        var items = channel.item;
        var feed = this.buildRSS(channel, items);
        if (xmlObj.rss.$ && xmlObj.rss.$['xmlns:itunes']) {
            this.decorateItunes(feed, channel);
        }
        return feed;
    };
    RssXmlParserService.buildRSS = function (channel, items) {
        var _this = this;
        items = items || [];
        var feed = {
            items: []
        };
        //set up lists of fields and items keys
        var feedFields = Fields.feed.concat(this.options.customFields.feed);
        var itemFields = Fields.item.concat(this.options.customFields.item);
        if (channel['atom:link'])
            feed.feedUrl = channel['atom:link'][0].$.href;
        //if there is an image, then get additional properties
        if (channel.image && channel.image[0] && channel.image[0].url) {
            feed.image = {};
            var image = channel.image[0];
            if (image.link)
                feed.image.link = image.link[0];
            if (image.url)
                feed.image.url = image.url[0];
            if (image.title)
                feed.image.title = image.title[0];
            if (image.width)
                feed.image.width = image.width[0];
            if (image.height)
                feed.image.height = image.height[0];
        }
        Utils.copyFromXML(channel, feed, feedFields);
        items.forEach(function (xmlItem) {
            var item = {};
            Utils.copyFromXML(xmlItem, item, itemFields);
            if (xmlItem.enclosure) {
                item.enclosure = xmlItem.enclosure[0].$;
            }
            if (xmlItem.description) {
                if (Array.isArray(xmlItem.description)) {
                    item.content = Utils.getContent(xmlItem.description[0]);
                }
                else {
                    item.content = Utils.getContent(xmlItem.description);
                }
                item.contentSnippet = Utils.getSnippet(item.content);
            }
            if (xmlItem.guid) {
                item.guid = Array.isArray(xmlItem.guid) ? xmlItem.guid[0] : xmlItem.guid;
                if (item.guid._)
                    item.guid = item.guid._;
            }
            if (xmlItem.category)
                item.categories = xmlItem.category;
            _this.setISODate(item);
            feed.items.push(item);
        });
        return feed;
    };
    /**
     * Add iTunes specific fields from XML to extracted JSON
     *
     * @access public
     * @param {object} feed extracted
     * @param {object} channel parsed XML
     */
    RssXmlParserService.decorateItunes = function (feed, channel) {
        var items = channel.item || [];
        var entry = {};
        feed.itunes = {};
        if (channel['itunes:owner']) {
            var owner = {}, image = void 0;
            if (channel['itunes:owner'][0]['itunes:name']) {
                owner.name = channel['itunes:owner'][0]['itunes:name'][0];
            }
            if (channel['itunes:owner'][0]['itunes:email']) {
                owner.email = channel['itunes:owner'][0]['itunes:email'][0];
            }
            if (channel['itunes:image']) {
                var hasImageHref = (channel['itunes:image'][0] &&
                    channel['itunes:image'][0].$ &&
                    channel['itunes:image'][0].$.href);
                image = hasImageHref ? channel['itunes:image'][0].$.href : null;
            }
            if (image) {
                feed.itunes.image = image;
            }
            feed.itunes.owner = owner;
        }
        Utils.copyFromXML(channel, feed.itunes, Fields.podcastFeed);
        items.forEach(function (item, index) {
            entry = feed.items[index];
            entry.itunes = {};
            Utils.copyFromXML(item, entry.itunes, Fields.podcastItem);
            var image = item['itunes:image'];
            if (image && image[0] && image[0].$ && image[0].$.href) {
                entry.itunes.image = image[0].$.href;
            }
        });
    };
    RssXmlParserService.setISODate = function (item) {
        var date = item.pubDate || item.date;
        if (date) {
            try {
                item.isoDate = new Date(date.trim()).toISOString();
            }
            catch (e) {
                // Ignore bad date format
            }
        }
    };
    RssXmlParserService.DEFAULT_HEADERS = {
        'User-Agent': 'rss-parser',
        'Accept': 'application/rss+xml',
    };
    RssXmlParserService.DEFAULT_MAX_REDIRECTS = 5;
    RssXmlParserService.DEFAULT_TIMEOUT = 60000;
    return RssXmlParserService;
}());
export { RssXmlParserService };
//# sourceMappingURL=rssXmlParserService.js.map