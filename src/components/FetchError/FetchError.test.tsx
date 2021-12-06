import { shallow } from 'enzyme';

import FetchError from './FetchError';

describe('FetchError component', () => {
  it('should render without any error', () => {
    const wrapper = shallow(<FetchError />);
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
