import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import * as TextProvider from '../../../store/providers/textProvider';
import ColorFilters from '../../../components/colorFilters';
import { defaultState } from '../../mocks';

describe('<colorFilters> test', () => {
  it('Snapshot should render correctly', () => {
    jest
      .spyOn(TextProvider, 'useStateValue')
      .mockImplementation(() => [defaultState]);

    const colorSelectorTree = renderer
      .create(<ColorFilters />)
      .toJSON();

    expect(colorSelectorTree).toMatchSnapshot();
  });
  it('Should render all buttons', () => {
    jest
      .spyOn(TextProvider, 'useStateValue')
      .mockImplementation(() => [defaultState]);

    const colorSelector = mount(<ColorFilters />);
    expect(colorSelector.find('button')).toHaveLength(defaultState.colors.length);
  });
  it('Should have selected button', () => {
    jest
      .spyOn(TextProvider, 'useStateValue')
      .mockImplementation(() => [defaultState]);

    const colorSelector = mount(<ColorFilters />);
    expect(colorSelector.find('.selected')).toHaveLength(defaultState.selectedFilters.length);
  });
  it('onClick should be called', () => {

    const mockFn = jest.fn().mockName('dispatch');

    jest
      .spyOn(TextProvider, 'useStateValue')
      .mockImplementation(() => [defaultState, mockFn]);

    const colorSelector = mount(<ColorFilters />);
    const selectedButton = colorSelector.find('.selected').last();
    selectedButton.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });
  it('Should render highlights', () => {

    const newState = Object.assign({}, defaultState, {
      ranges: [{ start: 0, end: 10, color: 'red'}],
      selectedFilters: ['red']
    });

    jest
      .spyOn(TextProvider, 'useStateValue')
      .mockImplementation(() => [newState]);

    const colorSelector = mount(<ColorFilters />);
    const highlight = colorSelector.find('.red');
    expect(highlight.html()).toBe('<span class="red">Test words</span>');
  });
});
