/// <reference types="react" />
import * as React from 'react';
import { IRssReaderProps, IRssReaderState } from './';
export default class RssReader extends React.Component<IRssReaderProps, IRssReaderState> {
    private viewAllLinkLabel;
    private feedLoadingLabel;
    constructor(props: IRssReaderProps);
    render(): React.ReactElement<IRssReaderProps>;
    componentDidUpdate(nextProps: any): void;
    private _onConfigure();
    private decodeHtml(html);
    private _onRenderListRow(item, index);
    private loadRssFeed();
}
