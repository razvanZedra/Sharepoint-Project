/// <reference types="jest" />

import * as React from 'react';
import { expect } from 'chai';
import { configure, mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { IScrollToTopButton } from './IScrollToTopButtonApplicationCustomizerProps';
import { ScrollToTopButton } from './ScrollToTopApplicationCustomizer';

describe('Scroll to Top', () => {
  let reactComponent: ReactWrapper<IScrollToTopButton>;

  beforeEach(() => {
    reactComponent = mount(React.createElement(
      ScrollToTopButton,
      {
        icon: 'TriangleUp12',
        shape: 'square',
        role: '',
        clickHandler: null
      } as IScrollToTopButton
    ));
  });

  afterEach(() => {
    reactComponent.unmount();
  });

  it('should root web part element exists', () => {
    // define the css selector
    let cssSelector: string = '.spfxScrolltotopBtn';

    // find the element using css selector
    const element = reactComponent.find(cssSelector);
    expect(element.length).to.be.greaterThan(0);
  });

  it('should launch click handler', () => {
    // define the css selector
    let cssSelector: string = '.spfxScrolltotopBtn';

    // find the element using css selector
    const element = reactComponent.find(cssSelector);
  });
});
