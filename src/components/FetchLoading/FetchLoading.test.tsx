import { shallow } from '../../setupTests';

import FetchLoading from './FetchLoading';

describe('FetchLoading component', () => {
  it('should render without any error', () => {
    const wrapper = shallow(<FetchLoading />);
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
