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
//const utils = module.exports = {};
//const entities = require('entities');
import { Builder } from 'xml2js';
var Utils = (function () {
    function Utils() {
    }
    Utils.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Utils.stripHtml = function (str) {
        return str.replace(/<(?:.|\n)*?>/gm, '');
    };
    Utils.getSnippet = function (str) {
        //return entities.decode(this.stripHtml(str)).trim();
        return this.stripHtml(str).trim();
    };
    Utils.getLink = function (links, rel, fallbackIdx) {
        if (!links)
            return;
        for (var i = 0; i < links.length; ++i) {
            if (links[i].$.rel === rel) {
                return links[i].$.href;
            }
        }
        if (links[fallbackIdx]) {
            return links[fallbackIdx].$.href;
        }
    };
    Utils.copyFromXML = function (xml, dest, fields) {
        fields.forEach(function (f) {
            var from = f;
            var to = f;
            var options = {};
            if (Array.isArray(f)) {
                from = f[0];
                to = f[1];
                if (f.length > 2) {
                    options = f[2];
                }
            }
            var keepArray = options;
            if (xml[from] !== undefined) {
                dest[to] = keepArray ? xml[from] : xml[from][0];
            }
        });
    };
    Utils.getContent = function (content) {
        if (typeof content._ === 'string') {
            return content._;
        }
        else if (typeof content === 'object') {
            var builder = new Builder({ headless: true, explicitRoot: true, rootName: 'div', renderOpts: { pretty: false } });
            return builder.buildObject(content);
        }
        else {
            return content;
        }
    };
    return Utils;
}());
export { Utils };
/*










utils.maybePromisify = function(callback, promise) {
  if (!callback) return promise;
  return promise.then(
    data => setTimeout(() => callback(null, data)),
    err => setTimeout(() => callback(err))
  );
}

const DEFAULT_ENCODING = 'utf8';
const ENCODING_REGEX = /(encoding|charset)\s*=\s*(\S+)/;
const SUPPORTED_ENCODINGS = ['ascii', 'utf8', 'utf16le', 'ucs2', 'base64', 'latin1', 'binary', 'hex'];
const ENCODING_ALIASES = {
  'utf-8': 'utf8',
  'iso-8859-1': 'latin1',
}

utils.getEncodingFromContentType = function(contentType) {
  contentType = contentType || '';
  let match = contentType.match(ENCODING_REGEX);
  let encoding = (match || [])[2] || '';
  encoding = encoding.toLowerCase();
  encoding = ENCODING_ALIASES[encoding] || encoding;
  if (!encoding || SUPPORTED_ENCODINGS.indexOf(encoding) === -1) {
    encoding = DEFAULT_ENCODING;
  }
  return encoding;
}
*/
//# sourceMappingURL=utils.js.map