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
import InstagramEmbed from 'react-instagram-embed';
import { InstaPosts } from './IZNetInstagram';



registerIcons({
  icons: {
    'TwitterIcon': <FontAwesomeIcon size="3x" icon={faTwitter} className={styles.twitterIcon} />,
    'InstagramIcon': <FontAwesomeIcon size="3x" icon={faInstagram} className={styles.instaIcon} />,
    'LinkedinIcon': <FontAwesomeIcon size="3x" icon={faLinkedin} className={styles.linkedInICon} />
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
        <Pivot className={styles.pivotControl} aria-label="ZNet Social Tabs" linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.large} >

          <PivotItem  headerButtonProps={{
              'data-id': 'LinkedinTabHeader'
            }} 
            itemIcon="LinkedinIcon" >
            <div><p>

              "serviceErrorCode": 500: Server Error. Api Node Throttled <br></br>yh
              "message": "Error Retrieving Posts: GET-companiesV2 /UGC/Posts/" <br></br>
              "status": 500 <br></br>

            </p></div>
          </PivotItem>
          <PivotItem 
          headerButtonProps={{
            'data-id': 'TwitterTabHeader'
          }} 
          itemIcon="TwitterIcon" >
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
          <PivotItem 
          headerButtonProps={{
            'data-id' : 'InstagramTabHeader'
          }}
          itemIcon="InstagramIcon" >
            <InstaPosts></InstaPosts>
          </PivotItem>
        </Pivot>

      </div>
    );
  }
}
