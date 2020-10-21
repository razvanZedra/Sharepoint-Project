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
      this.properties.title = 'ZNet Social Corner';
    }
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IZNetSocialTabsProps > =  React.createElement(
      ZNetSocialTabsFeed,
      {
        title: this.properties.title,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        },
        sourceType: this.properties.sourceType,
        screenName: this.properties.screenName,

        width:  this.properties.width,

        height:  this.properties.height,

        tweetLimit:  this.properties.tweetLimit
      }
      // this.properties
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

                ]
                }),
                PropertyPaneTextField('screenName', {
                  label: strings.ScreenName,
                  value: screenName,
                  disabled: sourceType && sourceType !== 'profile' && sourceType !== 'likes'
                }),

              ]
            },
            {
              groupName: strings.LayoutGroupName,
              groupFields: [

                PropertyPaneTextField('height', {
                  label: strings.Height,
                  value: height ? height.toString() : '',
                  disabled: false
                }),
                PropertyPaneTextField('width', {
                  label: strings.Width,
                  value: width ? width.toString() : ''
                }),

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

 
}
