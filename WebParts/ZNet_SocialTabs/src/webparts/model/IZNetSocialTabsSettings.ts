
import { DisplayMode } from '@microsoft/sp-core-library';
import { ITwittweTimelineSettings } from '../model/ITwitterTimelineSettings';

export interface IZNetSocialTabsSettings extends ITwittweTimelineSettings {
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
}
