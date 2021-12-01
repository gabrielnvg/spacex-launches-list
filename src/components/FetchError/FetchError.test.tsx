import { shallow } from 'enzyme';

import FetchError from './FetchError';

describe('FetchError component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<FetchError />);
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
