/// <reference types="react" />
import * as React from 'react';
import { IRssResultsTemplateProps, IRssResultsTemplateState } from './';
export default class RssResultsTemplate extends React.Component<IRssResultsTemplateProps, IRssResultsTemplateState> {
    private parentRef;
    constructor(props: IRssResultsTemplateProps);
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IRssResultsTemplateProps): void;
    private _updateTemplate(props);
}
