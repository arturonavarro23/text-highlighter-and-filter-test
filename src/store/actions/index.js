import { createTypes } from 'redux-action-types';

export const types = createTypes('actions/editor',
  'SET_TEXT',
  'SET_COLOR',
  'REMOVE_FILTER',
  'ADD_FILTER',
  'MODIFY_RANGES',
);

/**
 * @params {String} text
 */
export const setText = text => ({
  type: types.SET_TEXT,
  text,
});

/**
 * @params {String} color
 */
export const setColor = color => ({
  type: types.SET_COLOR,
  selectedColor: color,
});

/**
 * @params {String} filter
 */
export const addFilter = filter => ({
  type: types.ADD_FILTER,
  filter,
});

/**
 * @params {String} filter
 */
export const removeFilter = filter => ({
  type: types.REMOVE_FILTER,
  filter,
});

/**
 * @params {Array<JSON>} ranges
 */
export const modifyRanges = ranges => ({
  type: types.MODIFY_RANGES,
  ranges,
});
