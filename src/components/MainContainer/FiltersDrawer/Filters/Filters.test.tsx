import { shallow } from 'enzyme';

import Filters from './Filters';

test('should render without any error', () => {
  const wrapper = shallow(<Filters />);
  expect(wrapper.isEmptyRender()).toBe(false);
});
