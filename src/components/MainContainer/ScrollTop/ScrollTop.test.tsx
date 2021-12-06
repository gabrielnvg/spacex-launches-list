import { shallow } from 'enzyme';

import ScrollTop from './ScrollTop';

describe('ScrollTop component', () => {
  it('should render without any error', () => {
    const wrapper = shallow(
      <ScrollTop>
        <div>Hello World!</div>
      </ScrollTop>,
    );
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
