import reducer from '../../store/reducer';
import { types } from '../../store/actions';

describe("Reducer test", () => {
  it("Sould set text", () => {
    const action = { type: types.SET_TEXT, text: 'test words' };
    expect(reducer({
      text: 'hello world',
    }, action)).toEqual({ text: 'test words' });
  });
  it("Sould set color", () => {
    const action = { type: types.SET_COLOR, selectedColor: 'green' };
    expect(reducer({
      selectedColor: 'red',
    }, action)).toEqual({ selectedColor: 'green' });
  });
  it("Sould add color filter", () => {
    const action = { type: types.ADD_FILTER, filter: 'green' };
    expect(reducer({
      selectedFilters: ['yellow', 'red'],
    }, action)).toEqual({ selectedFilters: ['yellow', 'red', 'green'] });
  });
  it("Sould remove color filter", () => {
    const action = { type: types.REMOVE_FILTER, filter: 'red' };
    expect(reducer({
      selectedFilters: ['yellow', 'red'],
    }, action)).toEqual({ selectedFilters: ['yellow'] });
  });
  it("Sould modify ranges", () => {
    const ranges = [
      { start: 0, end: 1, color: 'red' },
      { start: 3, end: 4, color: 'green' }
    ];
    const action = { type: types.MODIFY_RANGES, ranges };
    expect(reducer({
      ranges: [{ start: 0, end: 1, color: 'blue' }],
    }, action)).toEqual({ ranges });
  });
});
