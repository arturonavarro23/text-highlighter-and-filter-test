import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import * as TextProvider from '../../../store/providers/textProvider';
import TextHighlighter from '../../../components/textHighlighter';
import { defaultState } from '../../mocks';

describe('<TextHighlighter> test', () => {
  it('Snapshot should render correctly', () => {
    jest
      .spyOn(TextProvider, 'useStateValue')
      .mockImplementation(() => [defaultState]);

    const textHighlighterTree = renderer
      .create(<TextHighlighter />)
      .toJSON();

    expect(textHighlighterTree).toMatchSnapshot();
  });
  it('Text area should display expexted text', () => {
    jest
      .spyOn(TextProvider, 'useStateValue')
      .mockImplementation(() => [defaultState]);

    const textHighlighter = mount(<TextHighlighter />);
    const textArea = textHighlighter.find("textarea");
    expect(textArea).toHaveLength(1);
    expect(textArea.text()).toBe('Test words');
  });
  it('Should display highlights', () => {

    const newState = Object.assign({}, defaultState, {
      ranges: [{ start: 0, end: 10, color: 'yellow'}],
    });

    jest
      .spyOn(TextProvider, 'useStateValue')
      .mockImplementation(() => [newState]);

    const textHighlighter = mount(<TextHighlighter />);
    const display = textHighlighter.find('.display');
    expect(display).toHaveLength(1);
    expect(display.html()).toBe('<div class="text-editor display"><span class="yellow">Test words</span></div>');
  });
});
