import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

import FiltersDrawer from './FiltersDrawer';

describe('FiltersDrawer component', () => {
  it('should render without any error', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <FiltersDrawer />
      </Provider>,
    );
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
