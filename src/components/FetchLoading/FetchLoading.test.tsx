import { shallow } from '../../setupTests';

import FetchLoading from './FetchLoading';

describe('FetchLoading component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<FetchLoading />);
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
