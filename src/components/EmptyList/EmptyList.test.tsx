import { shallow } from '../../setupTests';

import EmptyList from './EmptyList';

describe('EmptyList component', () => {
  it('should render without any error', () => {
    const wrapper = shallow(<EmptyList />);
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
