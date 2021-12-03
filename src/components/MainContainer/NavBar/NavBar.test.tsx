import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

import NavBar from './NavBar';

test('should render without any error', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <NavBar />
    </Provider>,
  );
  expect(wrapper.isEmptyRender()).toBe(false);
});
