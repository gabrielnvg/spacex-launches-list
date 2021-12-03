import { shallow } from 'enzyme';

import LaunchesList from './LaunchesList';

test('should render without any error', () => {
  const wrapper = shallow(<LaunchesList launches={[]} />);
  expect(wrapper.isEmptyRender()).toBe(false);
});
