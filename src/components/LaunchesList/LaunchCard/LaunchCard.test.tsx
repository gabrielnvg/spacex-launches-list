import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import launch from '../../../../__mocks__/launch';

import LaunchCard from './LaunchCard';

describe('LaunchCard component', () => {
  it('should render without any error', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <LaunchCard launch={launch} />
      </Provider>,
    );
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
