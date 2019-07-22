import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import * as TextProvider from '../../../store/providers/textProvider';
import ColorSelector from '../../../components/colorSelector';
import { defaultState } from '../../mocks';

describe('<ColorSelector> test', () => {
  it('Snapshot should render correctly', () => {
    jest
      .spyOn(TextProvider, 'useStateValue')
      .mockImplementation(() => [defaultState]);

    const colorSelectorTree = renderer
      .create(<ColorSelector />)
      .toJSON();

    expect(colorSelectorTree).toMatchSnapshot();
  });
  it('Should render all buttons', () => {
    jest
      .spyOn(TextProvider, 'useStateValue')
      .mockImplementation(() => [defaultState]);

    const colorSelector = mount(<ColorSelector />);
    expect(colorSelector.find('button')).toHaveLength(defaultState.colors.length);
  });
  it('Should have selected button', () => {
    jest
      .spyOn(TextProvider, 'useStateValue')
      .mockImplementation(() => [defaultState]);

    const colorSelector = mount(<ColorSelector />);
    const selectedButton = colorSelector.find('.selected');
    expect(selectedButton).toHaveLength(1);
    expect(selectedButton.hasClass(`btn--${defaultState.selectedColor}`)).toBe(true);
  });
  it('onColorButtonClick should be called', () => {

    const mockFn = jest.fn().mockName('dispatch');

    jest
      .spyOn(TextProvider, 'useStateValue')
      .mockImplementation(() => [defaultState, mockFn]);

    const colorSelector = mount(<ColorSelector />);
    const selectedButton = colorSelector.find('.selected');
    selectedButton.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
