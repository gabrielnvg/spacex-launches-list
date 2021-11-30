import { shallow } from 'enzyme';

import App from './App';

test('should render without any error', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.isEmptyRender()).toBe(false);
});
