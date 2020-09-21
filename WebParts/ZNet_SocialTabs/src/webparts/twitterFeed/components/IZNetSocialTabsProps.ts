import { ITwittweTimelineSettings } from '../../model/ITwitterTimelineSettings';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IZNetSocialTabsProps extends ITwittweTimelineSettings {
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
}




