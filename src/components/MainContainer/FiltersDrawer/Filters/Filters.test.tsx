import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../../../redux/store';

import Filters from './Filters';

describe('Filters component', () => {
  it('should render without any error', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Filters />
      </Provider>,
    );
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
