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
import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react';
import styles from './ScrollToTopApplicationCustomizer.module.scss';
var ScrollToTopButton = /** @class */ (function (_super) {
    __extends(ScrollToTopButton, _super);
    function ScrollToTopButton(props) {
        var _this = _super.call(this, props) || this;
        _this.clickBtnHandler = function () {
            _this.props.clickHandler();
        };
        return _this;
    }
    ScrollToTopButton.prototype.render = function () {
        var shapeStyle = styles[this.props.shape.toLowerCase()];
        return (React.createElement(DefaultButton, { primary: true, "aria-roledescription": this.props.role, role: this.props.role, onClick: this.clickBtnHandler, className: [styles.spfxScrolltotopBtn, shapeStyle].join(' ') },
            React.createElement("i", { title: 'Scroll Up', className: ['scrollUpIcon', 'ms-Icon', 'ms-Icon--' + this.props.icon].join(' ') })));
    };
    return ScrollToTopButton;
}(React.Component));
export { ScrollToTopButton };
//# sourceMappingURL=ScrollToTopApplicationCustomizer.js.map