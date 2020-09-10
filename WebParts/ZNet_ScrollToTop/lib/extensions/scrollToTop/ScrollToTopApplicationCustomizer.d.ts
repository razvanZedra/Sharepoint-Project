import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IScrollToTopApplicationCustomizerProperties {
    scrollDuration: number;
    buttonIcon: string;
    shape: string;
}
/** A Custom Action which can be run during execution of a Client Side Application */
export default class ScrollToTopApplicationCustomizer extends BaseApplicationCustomizer<IScrollToTopApplicationCustomizerProperties> {
    /** Content Page overflow
     * @property
     * @private
     */
    private _scrollRegion;
    /** SharePoint Modern bottom area
     * @property
     * @private
     */
    private _bottomPlaceholder;
    /** Statement of smooth scroll
     * @property
     * @private
     */
    private _currentTime;
    /** Timeout execution of scroll
     * @property
     * @private
     */
    private _increment;
    /** Distance beetween the top of the page and the current position
     * @property
     * @private
     */
    private _change;
    /** Current position in the page
     * @property
     * @private
     */
    private _start;
    /** Mobile view determined by class name (currently unused)
     * @property
     * @private
     */
    private _isMobileView;
    onInit(): Promise<void>;
    /** Get the scroll region in accordance with the defined scroll regions
     * @see ScrollToTopApplicationRegions
     * @param i Object index for recursive function
     * @private
     */
    private getScrollRegion;
    /** Launch scroll to top
     * @description Original animatedScrollTo come from: https://gist.github.com/andjosh/6764939
     * @private
     */
    private scrollTo;
    /** Add a smoothly scroll effect to top
     * @private
     */
    private animateScroll;
    /** Calc the effect to easy In/Out scroll
     * @param t Current time
     * @param b Start from page position
     * @param c Distance between the start and the top of the page
     * @param d Duration of scroll
     * @private
     */
    private easeInOutQuad;
    /** Use place holder of SharePoint
     * @private
     */
    private _renderPlaceHolders;
    /**
     * Dispose place holder area
     * @deprecated
     */
    private _onDispose;
}
//# sourceMappingURL=ScrollToTopApplicationCustomizer.d.ts.map