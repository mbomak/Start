import React from 'react';
import { shallow } from 'enzyme';

import DiceBoard from './index';

describe('<DiceBoard />', () => {
  it('renders without crashing', () => {
    shallow(<DiceBoard />);
  });
});
