import { shallow } from 'enzyme';

import MainContainer from './MainContainer';

describe('MainContainer component', () => {
  it('should render without any error', () => {
    const wrapper = shallow(
      <MainContainer>
        <div>Hello World!</div>
      </MainContainer>,
    );
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
