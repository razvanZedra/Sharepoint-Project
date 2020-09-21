import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { PropertyFieldSpinButton } from '@pnp/spfx-property-controls/lib/PropertyFieldSpinButton';
import { Placeholder, IPlaceholderProps } from '@pnp/spfx-controls-react/lib/Placeholder';

import * as strings from 'ZNetSocialTabsWebPartStrings';
import ZNetSocialTabsFeed from './components/ZNetSocialTabs';
import { IZNetSocialTabsProps } from './components/IZNetSocialTabsProps';
import { IZNetSocialTabsSettings } from '../model/IZNetSocialTabsSettings';

export interface IZNetSocialTabsWebPartProps extends IZNetSocialTabsSettings {
}

export default class ZNetSocialTabsWebPart extends BaseClientSideWebPart<IZNetSocialTabsWebPartProps> {

  public onInit(): Promise<void> {
    if (!this.properties.sourceType) {
      this.properties.sourceType = 'profile';
    }
    if (!this.properties.title) {
      this.properties.title = 'profile';
    }
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IZNetSocialTabsProps | IPlaceholderProps> = this.isConfigured() ? React.createElement(
      ZNetSocialTabsFeed,

      {
        title: this.properties.title,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        },
        sourceType: this.properties.sourceType,
        /**
         * Twitter public profile name to be used with 'profile' or 'likes' timeline
         */
        screenName: this.properties.screenName,
        /**
         * Twitter public profile user id to be used with 'profile' or 'likes' timeline
         */
        // userId: this.properties.userId,
        /**
         * List's owner name for 'list' timeline
        //  */
        // ownerScreenName: this.properties.ownerScreenName,
        // /**
        //  * List's name. For 'list' timeline
        //  */
        // slug: this.properties.slug,
        // /**
        //  * Unique list id for 'list' timeline OR
        //  * Unique collection id for 'collection' timeline
        //  */
        // id:  this.properties.id,
        // /**
        //  * Url source to show
        //  */
        // url:  this.properties.url,
        /**
         * Calculate widget's heigh based on parent
         */
        // autoHeight: this.properties.autoHeight,
        /**
         * Widget's theme
        //  */
        // theme: this.properties.theme,
        // /**
        //  * Border color (hex)
        //  */
        // borderColor: this.properties.borderColor,
        // /**
        //  * Do not display header
        //  */
        // noHeader: this.properties.noBorders,
        // /**
        //  * Do not display footer
        //  */
        // noFooter: this.properties.noFooter,
        // /**
        //  * Do not display border
        //  */
        // noBorders: this.properties.noBorders,
        // /**
        //  * Do not display scrollbar
        //  */
        // noScrollbar: this.properties.noScrollbar,
        // /**
        //  * Custom language code to use.
        //  * See https://developer.twitter.com/en/docs/twitter-for-websites/twitter-for-websites-supported-languages/overview.html
        //  */
        // lang: this.properties.lang,
        /**
         * Custom width
         */
        width:  this.properties.width,
        /**
         * Custom height (for autoHeight set to false)
         */
        height:  this.properties.height,
        /**
         * Number of tweets to display. 1..20
         */
        tweetLimit:  this.properties.tweetLimit
      }
      // this.properties
    ) : React.createElement(
      Placeholder,
      {
        iconName: 'Edit',
        iconText: strings.Configure,
        description: strings.ConfigureDescription,
        buttonLabel: strings.ConfigureButton,
        hideButton: this.displayMode === DisplayMode.Read,
        onConfigure: () => {
          this.context.propertyPane.open();
        }
      }
    );

    ReactDom.unmountComponentAtNode(this.domElement);
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onBeforeSerialize() {
    const {
      sourceType,
      // autoHeight,
      // noBorders
    } = this.properties;

    //
    // removing properties based on source type selection
    //
    // switch (sourceType) {
    //   case 'profile':
    //   case 'likes':
    //     delete this.properties.ownerScreenName;
    //     delete this.properties.slug;
    //     delete this.properties.id;
    //     delete this.properties.url;
    //     break;
    //   case 'list':
    //     delete this.properties.screenName;
    //     delete this.properties.id;
    //     delete this.properties.url;
    //     break;
    //   case 'collection':
    //     delete this.properties.screenName;
    //     delete this.properties.ownerScreenName;
    //     delete this.properties.slug;
    //     delete this.properties.url;
    //     break;
    //   case 'url':
    //     delete this.properties.screenName;
    //     delete this.properties.ownerScreenName;
    //     delete this.properties.slug;
    //     delete this.properties.id;
    //     break;
    // }

    // we don't need to save height if autoHeight is set
    // if (autoHeight) {
    //   delete this.properties.height;
    // }

    // we don't need to save border color if borders are hidden
    // if (noBorders) {
    //   delete this.properties.borderColor;
    // }
  }

  public get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any) {
    const value = newValue as number;
    if (propertyPath === 'tweetLimit') {
      if (value === 0) {
        //super.onPropertyPaneFieldChanged(propertyPath, oldValue, undefined);
        this.properties.tweetLimit = undefined;
        return;
      }
    }
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const {
      sourceType,
      screenName,
      // ownerScreenName,
      // slug,
      // id,
      // url,
      // autoHeight,
      // theme,
      // borderColor,
      // noHeader,
      // noFooter,
      // noBorders,
      // noScrollbar,
      width,
      height,
      tweetLimit
    } = this.properties;
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.SourceGroupName,
              groupFields: [
                PropertyPaneDropdown('sourceType', {
                  label: strings.SourceType,
                  selectedKey: sourceType || 'profile',
                  options: [{
                    key: 'profile',
                    text: strings.SourceTypeProfile
                  }
                  // , {
                  //   key: 'likes',
                  //   text: strings.SourceTypeLikes
                  // }, {
                  //   key: 'list',
                  //   text: strings.SourceTypeList
                  // }, {
                  //   key: 'collection',
                  //   text: strings.SourceTypeCollection
                  // }, {
                  //   key: 'url',
                  //   text: strings.SourceTypeUrl
                  // }
                ]
                }),
                PropertyPaneTextField('screenName', {
                  label: strings.ScreenName,
                  value: screenName,
                  disabled: sourceType && sourceType !== 'profile' && sourceType !== 'likes'
                }),
                // PropertyPaneTextField('ownerScreenName', {
                //   label: strings.OwnerScreenName,
                //   value: ownerScreenName,
                //   disabled: sourceType !== 'list'
                // }),
                // PropertyPaneTextField('slug', {
                //   label: strings.Slug,
                //   value: slug,
                //   disabled: sourceType !== 'list'
                // }),
                // PropertyPaneTextField('id', {
                //   label: strings.CollectionId,
                //   value: id,
                //   disabled: sourceType !== 'collection'
                // }),
                // PropertyPaneTextField('url', {
                //   label: strings.Url,
                //   value: url,
                //   disabled: sourceType !== 'url'
                // })
              ]
            },
            {
              groupName: strings.LayoutGroupName,
              groupFields: [
                // PropertyPaneDropdown('theme', {
                //   label: strings.Theme,
                //   selectedKey: theme || 'light',
                //   options: [{
                //     key: 'light',
                //     text: strings.ThemeLight
                //   }, {
                //     key: 'dark',
                //     text: strings.ThemeDark
                //   }]
                // }),
                // PropertyPaneToggle('autoHeight', {
                //   label: strings.AutoHeight,
                //   onText: strings.Yes,
                //   offText: strings.No,
                //   checked: autoHeight
                // }),
                PropertyPaneTextField('height', {
                  label: strings.Height,
                  value: height ? height.toString() : '',
                  disabled: false
                }),
                PropertyPaneTextField('width', {
                  label: strings.Width,
                  value: width ? width.toString() : ''
                }),
                // PropertyPaneToggle('noHeader', {
                //   label: strings.NoHeader,
                //   onText: strings.Yes,
                //   offText: strings.No,
                //   checked: noHeader
                // }),
                // PropertyPaneToggle('noFooter', {
                //   label: strings.NoFooter,
                //   onText: strings.Yes,
                //   offText: strings.No,
                //   checked: noFooter
                // }),
                // PropertyPaneToggle('noScrollbar', {
                //   label: strings.NoScrollbar,
                //   onText: strings.Yes,
                //   offText: strings.No,
                //   checked: noScrollbar
                // }),
                // PropertyPaneToggle('noBorders', {
                //   label: strings.NoBorders,
                //   onText: strings.Yes,
                //   offText: strings.No,
                //   checked: noBorders
                // }),
                // PropertyFieldColorPicker('borderColor', {
                //   key: 'borderColor',
                //   label: strings.BorderColor,
                //   selectedColor: borderColor,
                //   disabled: noBorders,
                //   style: PropertyFieldColorPickerStyle.Inline,
                //   properties: this.properties,
                //   onPropertyChange: this.onPropertyPaneFieldChanged
                // }),
                PropertyFieldSpinButton('tweetLimit', {
                  key: 'tweetLimit',
                  label: strings.TweetLimit,
                  initialValue: tweetLimit,
                  min: 0,
                  max: 20,
                  step: 1,
                  decimalPlaces: 0,
                  properties: this.properties,
                  onPropertyChange: this.onPropertyPaneFieldChanged
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private isConfigured(): boolean {
    const {
      sourceType,
      screenName,
      // ownerScreenName,
      // slug,
      // id,
      // url
    } = this.properties;

    if (!sourceType) {
      return false;
    }

    switch (sourceType) {
      case 'profile':
      // case 'likes':
        return !!screenName;
        break;
      // case 'list':
      //   return !!ownerScreenName && !!slug;
      //   break;
      // case 'collection':
      //   return !!id;
      //   break;
      // case 'url':
      //   return !!url;
      //   break;
    }
  }
}