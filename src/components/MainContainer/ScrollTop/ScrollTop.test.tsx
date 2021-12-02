import { shallow } from 'enzyme';

import ScrollTop from './ScrollTop';

describe('ScrollTop component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <ScrollTop>
        <div>Hello World!</div>
      </ScrollTop>,
    );
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
