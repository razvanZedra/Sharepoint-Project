var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer, PlaceholderName } from '@microsoft/sp-application-base';
import { ScrollToTopButton } from './components/ScrollToTopApplicationCustomizer';
import styles from './components/ScrollToTopApplicationCustomizer.module.scss';
import * as strings from 'ScrollToTopApplicationCustomizerStrings';
var scrollRegions = require('./ScrollToTopApplicationRegions.json');
var LOG_SOURCE = 'ScrollToTopApplicationCustomizer';
/** A Custom Action which can be run during execution of a Client Side Application */
var ScrollToTopApplicationCustomizer = /** @class */ (function (_super) {
    __extends(ScrollToTopApplicationCustomizer, _super);
    function ScrollToTopApplicationCustomizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //#region Properties
        /** Content Page overflow
         * @property
         * @private
         */
        _this._scrollRegion = undefined;
        /** Statement of smooth scroll
         * @property
         * @private
         */
        _this._currentTime = 0;
        /** Timeout execution of scroll
         * @property
         * @private
         */
        _this._increment = 20;
        /** Distance beetween the top of the page and the current position
         * @property
         * @private
         */
        _this._change = 0;
        /** Current position in the page
         * @property
         * @private
         */
        _this._start = 0;
        /** Mobile view determined by class name (currently unused)
         * @property
         * @private
         */
        _this._isMobileView = false;
        /** Launch scroll to top
         * @description Original animatedScrollTo come from: https://gist.github.com/andjosh/6764939
         * @private
         */
        _this.scrollTo = function () {
            _this._scrollRegion = undefined;
            _this._isMobileView = false;
            _this.getScrollRegion();
            if (_this._scrollRegion) {
                _this._start = _this._scrollRegion.scrollTop;
                _this._change = 0 - _this._start;
                _this._currentTime = 0;
                _this.animateScroll();
            }
        };
        return _this;
    }
    //#endregion
    ScrollToTopApplicationCustomizer.prototype.onInit = function () {
        Log.info(LOG_SOURCE, "Initialized Scroll to top extension");
        /* If the duration property is empty, the default will be 1 second */
        if (!this.properties.scrollDuration || isNaN(this.properties.scrollDuration)) {
            this.properties.scrollDuration = 400;
        }
        /* If no UI Fabric icon class was specified, the value by default will be 'ChevronUpSmall' */
        if (!this.properties.buttonIcon) {
            this.properties.buttonIcon = 'TriangleUp12';
        }
        /* If no shape was specified, the default value will be 'square' */
        if (!this.properties.shape || this.properties.shape.toLowerCase() != 'circle') {
            this.properties.shape = 'square';
        }
        this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
        this.context.application.navigatedEvent.add(this, this._renderPlaceHolders);
        return Promise.resolve();
    };
    /** Get the scroll region in accordance with the defined scroll regions
     * @see ScrollToTopApplicationRegions
     * @param i Object index for recursive function
     * @private
     */
    ScrollToTopApplicationCustomizer.prototype.getScrollRegion = function (i) {
        if (i === void 0) { i = 0; }
        this._scrollRegion = document.querySelector("" + scrollRegions[i].selector);
        if (!this._scrollRegion) {
            if (i < scrollRegions.length) {
                this.getScrollRegion((i + 1));
            }
            else {
                console.log('No scroll region found.');
            }
        }
        else {
            this._isMobileView = scrollRegions[i].isMobile;
            if (scrollRegions[i].forceOverflow) {
                this._scrollRegion.style.overflow = 'auto';
            }
        }
    };
    /** Add a smoothly scroll effect to top
     * @private
     */
    ScrollToTopApplicationCustomizer.prototype.animateScroll = function () {
        var _this = this;
        this._currentTime += this._increment;
        var val = this.easeInOutQuad(this._currentTime, this._start, this._change, this.properties.scrollDuration);
        this._scrollRegion.scrollTop = val;
        if (this._currentTime < this.properties.scrollDuration) {
            setTimeout(function () {
                _this.animateScroll();
            }, this._increment);
        }
    };
    /** Calc the effect to easy In/Out scroll
     * @param t Current time
     * @param b Start from page position
     * @param c Distance between the start and the top of the page
     * @param d Duration of scroll
     * @private
     */
    ScrollToTopApplicationCustomizer.prototype.easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1)
            return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };
    /** Use place holder of SharePoint
     * @private
     */
    ScrollToTopApplicationCustomizer.prototype._renderPlaceHolders = function () {
        if (!this._bottomPlaceholder) {
            this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, { onDispose: this._onDispose });
            // The extension should not assume that the expected placeholder is available.
            if (!this._bottomPlaceholder) {
                console.error(strings.errorBottomPlaceHolder);
                return;
            }
            var e = document.getElementsByClassName("." + styles.spfxScrolltotopBtn);
            if (this._bottomPlaceholder.domElement && (!e || e.length < 1)) {
                var element = React.createElement(ScrollToTopButton, {
                    icon: this.properties.buttonIcon,
                    shape: this.properties.shape,
                    role: strings.btnRole,
                    clickHandler: this.scrollTo
                });
                ReactDom.render(element, this._bottomPlaceholder.domElement);
            }
        }
    };
    /**
     * Dispose place holder area
     * @deprecated
     */
    ScrollToTopApplicationCustomizer.prototype._onDispose = function () {
    };
    __decorate([
        override
    ], ScrollToTopApplicationCustomizer.prototype, "onInit", null);
    return ScrollToTopApplicationCustomizer;
}(BaseApplicationCustomizer));
export default ScrollToTopApplicationCustomizer;
//# sourceMappingURL=ScrollToTopApplicationCustomizer.js.map
