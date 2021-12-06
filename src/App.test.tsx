import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';

describe('App component', () => {
  it('should render without any error', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
