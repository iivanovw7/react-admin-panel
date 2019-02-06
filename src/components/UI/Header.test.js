import React from 'react';
import { shallow } from 'enzyme';

import { Header } from './Header';

describe('Header', () => {

  it('should render correctly in "debug" mode', () => {

    const component = shallow(<Header debug />);

    expect(component).toMatchSnapshot();

  });

});