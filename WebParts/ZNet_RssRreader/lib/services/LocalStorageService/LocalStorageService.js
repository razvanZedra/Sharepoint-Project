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
import { Logger, ConsoleListener } from '@pnp/logging';
import { Md5 } from 'ts-md5/dist/md5';
var LocalStorageService = (function () {
    function LocalStorageService() {
        // Setup the Logger
        var consoleListener = new ConsoleListener();
        Logger.subscribe(consoleListener);
    }
    /**
     * Attempt to get local storage value based on key
     * @param keyToken the key value used to retrive and verify local storage
     * @return any - the found and validated local storage value
     */
    LocalStorageService.prototype.get = function (keyToken) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var p;
            return __generator(this, function (_a) {
                p = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var returnValue, keyHash, storageKey, keyValue, keyDate, timeout;
                    return __generator(this, function (_a) {
                        try {
                            keyHash = Md5.hashStr(JSON.stringify(keyToken.keyName));
                            console.log("LS get: keyhash - " + keyHash);
                            storageKey = (keyToken.keyPrefix ? keyToken.keyPrefix + "_" : "") + keyHash;
                            console.log("LS get: storagekey - " + storageKey);
                            keyValue = JSON.parse(localStorage.getItem(storageKey));
                            //with a valid response, we can continue
                            if (keyValue) {
                                //check timeout if one provided
                                if (keyToken.timeOutInMinutes > 0) {
                                    keyDate = new Date(keyValue.keyDate.toString());
                                    timeout = new Date(keyDate.getTime() + keyToken.timeOutInMinutes * 60000);
                                    //console.log("LS get: now " + new Date(Date.now()).toString());
                                    //console.log("LS get: timeout " + timeout.toString());
                                    //check to see if the local storage is stale or not
                                    if (timeout.getTime() > Date.now()) {
                                        //still valid, thus return whatever was found in local storage
                                        returnValue = keyValue.keyValue;
                                    }
                                    else {
                                        //attempt to remove from local storage for garbage collection
                                        localStorage.removeItem(storageKey);
                                    }
                                }
                                else {
                                    //no timeout was provided, thus simply return
                                    returnValue = keyValue.keyValue;
                                }
                            }
                            else {
                                //key was not found in local storage, simply continue
                            }
                            //resolve the promise with whatever was found, a valid, or null
                            resolve(returnValue);
                        }
                        catch (error) {
                            Logger.write('[LocalStorageService.get()]: Error: ' + error, 3 /* Error */);
                            reject(null);
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/, p];
            });
        });
    };
    /**
     * Attempt to set local storage value based on key
     * @param keyToken the key value used to store to local storage
     * @return boolean - true upon success
     */
    LocalStorageService.prototype.set = function (keyToken) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var p;
            return __generator(this, function (_a) {
                p = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var keyHash, storageKey, keyValue;
                    return __generator(this, function (_a) {
                        try {
                            keyHash = Md5.hashStr(JSON.stringify(keyToken.keyName));
                            console.log("LS set: keyhash - " + keyHash);
                            storageKey = (keyToken.keyPrefix ? keyToken.keyPrefix + "_" : "") + keyHash;
                            console.log("LS set: storagekey - " + storageKey);
                            keyValue = {
                                keyValue: keyToken.keyValue,
                                keyDate: new Date(Date.now())
                            };
                            //attempt to store to local storage
                            localStorage.setItem(storageKey, JSON.stringify(keyValue));
                            resolve(true);
                        }
                        catch (error) {
                            Logger.write('[LocalStorageService.set()]: Error: ' + error, 3 /* Error */);
                            reject(false);
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/, p];
            });
        });
    };
    return LocalStorageService;
}());
export default LocalStorageService;
//# sourceMappingURL=LocalStorageService.js.map