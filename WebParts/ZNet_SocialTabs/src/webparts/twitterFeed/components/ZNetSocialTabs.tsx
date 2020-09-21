import * as React from 'react';
import styles from './ZNetSocialTabs.module.scss';
import { IZNetSocialTabsProps } from './IZNetSocialTabsProps';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { registerIcons } from '@uifabric/styling';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';



registerIcons({
  icons: {
    'TwitterIcon': <FontAwesomeIcon size="1x" icon={faTwitter}  />,
    'InstagramIcon': <FontAwesomeIcon size="1x"  icon={faInstagram} />,
    'LinkedinIcon': <FontAwesomeIcon  size="1x" icon={faLinkedin}  />
  }
});
export default class TwitterFeed extends React.Component<IZNetSocialTabsProps, {}> {
  public render(): React.ReactElement<IZNetSocialTabsProps> {
    const {
      sourceType,
      screenName,
      width,
      height,
      tweetLimit,
      title,
      updateProperty,
      displayMode
    } = this.props;

    return (
      <div className={styles.twitterFeed}>
        <WebPartTitle displayMode={displayMode}
          title={title} className={styles.zNetWpTitle}
          updateProperty={updateProperty} />
        <Pivot className={styles.pivotControl} aria-label="ZNet Social Tabs" linkFormat={PivotLinkFormat.tabs}  linkSize={PivotLinkSize.large} >
          <PivotItem itemIcon="TwitterIcon" headerText="Twitter">
            <TwitterTimelineEmbed
              sourceType={sourceType}
              screenName={screenName}
              noHeader={true}
              noFooter={true}
              noBorders={true}
              noScrollbar={true}
              lang={'en'}
              options={{
                height: height,
                width: width,
                tweetLimit: tweetLimit
              }} />
          </PivotItem>
          <PivotItem  itemIcon="InstagramIcon" headerText="Instagram">
            <Label>Pivot #2</Label>
          </PivotItem>
          <PivotItem itemIcon="LinkedinIcon" headerText="LinkedIn">
            <Label>Pivot #3</Label>
          </PivotItem>
        </Pivot>

      </div>
    );
  }
}
