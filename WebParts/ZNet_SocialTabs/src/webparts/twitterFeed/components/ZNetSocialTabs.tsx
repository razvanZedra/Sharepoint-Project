import * as React from 'react';
import styles from './ZNetSocialTabs.module.scss';
import { IZNetSocialTabsProps } from './IZNetSocialTabsProps';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { registerIcons } from '@uifabric/styling';
import { Label } from 'office-ui-fabric-react/lib/Label';
// import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Pivot, PivotItem, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
// registerIcons({
//   icons: {
//     'Home': <Icon icon={['fal', 'home']} />,
//     'HomeSolid': <Icon icon={['fas', 'home']} />,
//   }
// });
export default class TwitterFeed extends React.Component<IZNetSocialTabsProps, {}> {
  public render(): React.ReactElement<IZNetSocialTabsProps> {
    const {
      sourceType,
      screenName,
      // userId,
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
      // lang,
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
        <Pivot aria-label="ZNet Social Tabs" linkFormat={PivotLinkFormat.tabs}>
          <PivotItem itemIcon="Emoji2" headerText="Twitter">
            <TwitterTimelineEmbed
              sourceType={sourceType}
              screenName={screenName}
              // userId={userId}
              // ownerScreenName={ownerScreenName}
              // slug={slug}
              // id={id}
              // url={url}
              //  autoHeight={autoHeight}
              // theme={theme}
              // borderColor={borderColor}
              noHeader={true}
              noFooter={true}
              noBorders={true}
              noScrollbar={true}
              lang={'en'}
              // noHeader={noHeader}
              // noFooter={noFooter}
              // noBorders={noBorders}
              // noScrollbar={noScrollbar}
              // lang={lang || 'en'}
              options={{
                // height: autoHeight ? undefined : height,
                height: height,
                width: width,
                tweetLimit: tweetLimit
              }} />
          </PivotItem>
          <PivotItem headerText="Bar">
            <Label>Pivot #2</Label>
          </PivotItem>
          <PivotItem headerText="Bas">
            <Label>Pivot #3</Label>
          </PivotItem>
          <PivotItem headerText="Biz">
            <Label>Pivot #4</Label>
          </PivotItem>
        </Pivot>

      </div>
    );
  }
}
