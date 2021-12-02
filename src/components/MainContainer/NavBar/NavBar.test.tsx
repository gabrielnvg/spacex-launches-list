import { shallow } from 'enzyme';

import NavBar from './NavBar';

describe('NavBar component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
