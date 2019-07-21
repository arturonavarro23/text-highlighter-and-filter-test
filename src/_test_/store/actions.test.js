import * as actions from '../../store/actions';

describe('Actions test', () => {
  it('Should create an action to setText', () => {
    const text = 'Hello world';
    const expectedAction = {
      type: actions.types.SET_TEXT,
      text,
    };
    expect(actions.setText(text)).toEqual(expectedAction);
  });
  it('Should create an action to setColor', () => {
    const selectedColor = 'red';
    const expectedAction = {
      type: actions.types.SET_COLOR,
      selectedColor,
    };
    expect(actions.setColor(selectedColor)).toEqual(expectedAction);
  });
  it('Should create an action to addFilter', () => {
    const filter = 'red';
    const expectedAction = {
      type: actions.types.ADD_FILTER,
      filter,
    };
    expect(actions.addFilter(filter)).toEqual(expectedAction);
  });
  it('Should create an action to removeFilter', () => {
    const filter = 'red';
    const expectedAction = {
      type: actions.types.REMOVE_FILTER,
      filter,
    };
    expect(actions.removeFilter(filter)).toEqual(expectedAction);
  });
  it('Should create an action to modifyRanges', () => {
    const ranges = [{ start: 0, end: 2, color: 'red' }];
    const expectedAction = {
      type: actions.types.MODIFY_RANGES,
      ranges,
    };
    expect(actions.modifyRanges(ranges)).toEqual(expectedAction);
  });
});