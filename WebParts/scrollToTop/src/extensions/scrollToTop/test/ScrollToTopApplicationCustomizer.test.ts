/// <reference types="mocha" />

import * as React from 'react';
import { assert, expect } from 'chai';
import { configure, mount, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import IScrollToTopApplicationCustomizerProperties from '../ScrollToTopApplicationCustomizer';
import ScrollToTopApplicationCustomizer from '../ScrollToTopApplicationCustomizer';

describe('Scroll to Top Place Holder', () => {

});
