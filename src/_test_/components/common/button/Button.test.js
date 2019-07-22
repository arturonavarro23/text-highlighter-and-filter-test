import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Button from '../../../../components/common/button';

describe('<ColorSelector> test', () => {
  it('Snapshot should renders correctly', () => {
    const mockFn = jest.fn();
    const button = (
      <Button
        variant="red"
        onClick={mockFn}
      />
    );

    const colorSelectorTree = renderer
      .create(button)
      .toJSON();

    expect(colorSelectorTree).toMatchSnapshot();
  });
  it('Should be selected', () => {
    const mockFn = jest.fn();

    const buttonWrapper = mount(
      <Button
        variant="red"
        onClick={mockFn}
        selected
      />
    );

    expect(buttonWrapper.find('button').hasClass('btn--red')).toBe(true);
  });
  it('onClick should be called', () => {
    const mockFn = jest.fn().mockName('onClick');

    const buttonWrapper = mount(
      <Button
        variant="red"
        onClick={mockFn}
        selected
      />
    );

    const button = buttonWrapper.find('button');
    button.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
