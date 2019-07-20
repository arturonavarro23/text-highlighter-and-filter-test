import { types } from '../actions';
import mockText from '../../data/text';

const {
  SET_TEXT,
  SET_COLOR,
  ADD_FILTER,
  REMOVE_FILTER,
  MODIFY_RANGES,
} = types;

export default (state, action) => {
  switch (action.type) {
    case SET_TEXT:
      return {
        ...state,
        text: action.text,
      };
    case SET_COLOR:
      return {
        ...state,
        selectedColor: action.selectedColor
      };
    case ADD_FILTER:
      return {
        ...state,
        selectedFilters: state.selectedFilters.concat(action.filter),
      };
    case REMOVE_FILTER:
      return {
        ...state,
        selectedFilters: state.selectedFilters.filter(f => f !== action.filter),
      };
    case MODIFY_RANGES:
      return {
        ...state,
        ranges: action.ranges,
      };
    default:
      return state;
  }
};

export const initialState = {
  text: mockText,
  colors: ['red', 'yellow', 'green'],
  selectedColor: 'red',
  selectedFilters: [],
  ranges: []
}
