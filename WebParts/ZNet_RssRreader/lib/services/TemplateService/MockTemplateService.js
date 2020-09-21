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
import { html } from 'common-tags';
import BaseTemplateService from './BaseTemplateService';
var MockTemplateService = (function (_super) {
    __extends(MockTemplateService, _super);
    function MockTemplateService(locale) {
        var _this = _super.call(this) || this;
        _this._mockFileContent = (_a = ["\n<div class='template_root'>\n  <div class=\"template_rssCard\">\n    <span><strong>Mocked external template</strong></span>\n\n    <div class=\"ms-Grid\">\n      <div class=\"ms-Grid-row\">\n        {{#each items as |item|}}\n          <div class=\"ms-Grid-col ms-sm12 ms-md6 ms-lg6\">\n            <div class=\"rssSingleCard\">\n              <div class=\"ms-Grid\">\n                <div class=\"ms-Grid-row\">\n                  <div class=\"ms-Grid-col ms-sm12 ms-md4\">\n                      <div class=\"previewImg\">\n                          <img class=\"cardFileIcon\" src=\"\"/>\n                      </div>\n                  </div>\n                  <div class=\"ms-Grid-col ms-sm12 ms-md8\">\n                      <span class=\"ms-ListItem-primaryText\"><a href=\"\">Title</a></span>\n                      <span class=\"ms-ListItem-secondaryText\">short description</span>\n                  </div>\n                </div>\n                <div class=\"ms-Grid-row\">\n                  <div class=\"ms-Grid-col ms-sm12\">\n                      <div class=\"comments\">Description</div>\n                      <div class=\"date\">Date</div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        {{/each}}\n      </div>\n    </div>\n  </div>\n</div>\n        "], _a.raw = ["\n<div class='template_root'>\n  <div class=\"template_rssCard\">\n    <span><strong>Mocked external template</strong></span>\n\n    <div class=\"ms-Grid\">\n      <div class=\"ms-Grid-row\">\n        {{#each items as |item|}}\n          <div class=\"ms-Grid-col ms-sm12 ms-md6 ms-lg6\">\n            <div class=\"rssSingleCard\">\n              <div class=\"ms-Grid\">\n                <div class=\"ms-Grid-row\">\n                  <div class=\"ms-Grid-col ms-sm12 ms-md4\">\n                      <div class=\"previewImg\">\n                          <img class=\"cardFileIcon\" src=\"\"/>\n                      </div>\n                  </div>\n                  <div class=\"ms-Grid-col ms-sm12 ms-md8\">\n                      <span class=\"ms-ListItem-primaryText\"><a href=\"\">Title</a></span>\n                      <span class=\"ms-ListItem-secondaryText\">short description</span>\n                  </div>\n                </div>\n                <div class=\"ms-Grid-row\">\n                  <div class=\"ms-Grid-col ms-sm12\">\n                      <div class=\"comments\">Description</div>\n                      <div class=\"date\">Date</div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        {{/each}}\n      </div>\n    </div>\n  </div>\n</div>\n        "], html(_a));
        _this.CurrentLocale = locale;
        return _this;
        var _a;
    }
    MockTemplateService.prototype.getFileContent = function (fileUrl) {
        var _this = this;
        var p1 = new Promise(function (resolve) {
            setTimeout(function () {
                resolve(_this._mockFileContent);
            }, 1000);
        });
        return p1;
    };
    MockTemplateService.prototype.ensureFileResolves = function (fileUrl) {
        return Promise.resolve();
    };
    return MockTemplateService;
}(BaseTemplateService));
export default MockTemplateService;
//# sourceMappingURL=MockTemplateService.js.map