import { shallow } from '../../setupTests';

import EmptyList from './EmptyList';

describe('EmptyList component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<EmptyList />);
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
