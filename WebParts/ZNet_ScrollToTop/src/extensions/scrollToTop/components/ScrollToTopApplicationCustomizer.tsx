import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react';

import styles from './ScrollToTopApplicationCustomizer.module.scss';

import { IScrollToTopButton } from './IScrollToTopButtonApplicationCustomizerProps';

export class ScrollToTopButton extends React.Component<IScrollToTopButton> {

    constructor(props: any) {
        super(props);
    }

    public render(): React.ReactElement {
        let shapeStyle = styles[this.props.shape.toLowerCase()];
        return (
            <DefaultButton
                primary
                aria-roledescription={this.props.role}
                role={this.props.role}
                onClick={this.clickBtnHandler}
                className={[styles.spfxScrolltotopBtn, shapeStyle].join(' ')}
            >
                <i title='Scroll Up' className={['scrollUpIcon','ms-Icon', 'ms-Icon--' + this.props.icon].join(' ')}></i>
            </DefaultButton>
        );
    }

    private clickBtnHandler = () => {
        this.props.clickHandler();
    }

}
