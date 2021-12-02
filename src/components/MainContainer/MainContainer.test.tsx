import { shallow } from 'enzyme';

import MainContainer from './MainContainer';

describe('MainContainer component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <MainContainer>
        <div>Hello World!</div>
      </MainContainer>,
    );
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
