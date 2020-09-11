
import * as React from 'react';
import * as ReactDom from 'react-dom';

import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer, PlaceholderContent, PlaceholderName } from '@microsoft/sp-application-base';

import { ScrollToTopButton } from './components/ScrollToTopApplicationCustomizer';
import { IScrollToTopButton } from './components/IScrollToTopButtonApplicationCustomizerProps';

import styles from './components/ScrollToTopApplicationCustomizer.module.scss';

import * as strings from 'ScrollToTopApplicationCustomizerStrings';

var scrollRegions: any = require('./ScrollToTopApplicationRegions.json');

const LOG_SOURCE: string = 'ScrollToTopApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IScrollToTopApplicationCustomizerProperties {
  // This is an example; replace with your own property
  scrollDuration: number;
  buttonIcon: string;
  shape: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ScrollToTopApplicationCustomizer extends BaseApplicationCustomizer<IScrollToTopApplicationCustomizerProperties> {

  //#region Properties
  /** Content Page overflow
   * @property
   * @private
   */
  private _scrollRegion: HTMLElement = undefined;

  /** SharePoint Modern bottom area
   * @property
   * @private
   */
  private _bottomPlaceholder: PlaceholderContent | undefined;

  /** Statement of smooth scroll
   * @property
   * @private
   */
  private _currentTime: number = 0;

  /** Timeout execution of scroll
   * @property
   * @private
   */
  private _increment: number = 20;

  /** Distance beetween the top of the page and the current position
   * @property
   * @private
   */
  private _change: number = 0;

  /** Current position in the page
   * @property
   * @private
   */
  private _start: number = 0;

  /** Mobile view determined by class name (currently unused)
   * @property
   * @private
   */
  private _isMobileView: boolean = false;
  //#endregion

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized Scroll to top extension`);

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
  }

  /** Get the scroll region in accordance with the defined scroll regions
   * @see ScrollToTopApplicationRegions
   * @param i Object index for recursive function
   * @private
   */
  private getScrollRegion(i: number = 0) {
    this._scrollRegion = document.querySelector(`${scrollRegions[i].selector}`);
    if (!this._scrollRegion) {
      if (i < scrollRegions.length) {
        this.getScrollRegion((i + 1));
      } else {
        console.log('No scroll region found.');
      }
    } else {
      this._isMobileView = scrollRegions[i].isMobile;
      if (scrollRegions[i].forceOverflow) {
        this._scrollRegion.style.overflow = 'auto';
      }
    }
  }

  /** Launch scroll to top
   * @description Original animatedScrollTo come from: https://gist.github.com/andjosh/6764939
   * @private
   */
  private scrollTo = () => {
    this._scrollRegion = undefined;
    this._isMobileView = false;
    this.getScrollRegion();
    if (this._scrollRegion) {
      this._start = this._scrollRegion.scrollTop;
      this._change = 0 - this._start;
      this._currentTime = 0;

      this.animateScroll();
    }
  }

  /** Add a smoothly scroll effect to top
   * @private
   */
  private animateScroll() {
    this._currentTime += this._increment;
    var val = this.easeInOutQuad(this._currentTime, this._start, this._change, this.properties.scrollDuration);
    this._scrollRegion.scrollTop = val;
    if (this._currentTime < this.properties.scrollDuration) {
      setTimeout(() => {
        this.animateScroll();
      }, this._increment);
    }
  }

  /** Calc the effect to easy In/Out scroll
   * @param t Current time
   * @param b Start from page position
   * @param c Distance between the start and the top of the page
   * @param d Duration of scroll
   * @private
   */
  private easeInOutQuad(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  /** Use place holder of SharePoint
   * @private
   */
  private _renderPlaceHolders(): void {
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceholder) {
        console.error(strings.errorBottomPlaceHolder);
        return;
      }
      let e: HTMLCollectionOf<Element> = document.getElementsByClassName(`.${styles.spfxScrolltotopBtn}`);
      if (this._bottomPlaceholder.domElement && (!e || e.length < 1)) {
        const element: React.ReactElement<IScrollToTopButton> = React.createElement(
          ScrollToTopButton,
          {
            icon: this.properties.buttonIcon,
            shape: this.properties.shape,
            role: strings.btnRole,
            clickHandler: this.scrollTo
          }
        );
        ReactDom.render(element, this._bottomPlaceholder.domElement);
      }
    }
  }

  /**
   * Dispose place holder area
   * @deprecated
   */
  private _onDispose(): void {
  }
}
