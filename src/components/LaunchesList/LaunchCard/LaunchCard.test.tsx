import { shallow } from 'enzyme';

import LaunchCard from './LaunchCard';

test('should render without any error', () => {
  const wrapper = shallow(<LaunchCard launch={{}} />);
  expect(wrapper.isEmptyRender()).toBe(false);
});
