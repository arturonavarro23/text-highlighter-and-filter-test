import { createTypes } from 'redux-action-types';

export const types = createTypes('actions/editor',
  'SET_TEXT',
  'SET_COLOR',
  'REMOVE_FILTER',
  'ADD_FILTER',
  'MODIFY_RANGES',
);

export const setText = text => ({
  type: types.SET_TEXT,
  text,
});

export const setColor = color => ({
  type: types.SET_COLOR,
  selectedColor: color,
});

export const addFilter = filter => ({
  type: types.ADD_FILTER,
  filter,
});

export const removeFilter = filter => ({
  type: types.REMOVE_FILTER,
  filter,
});

export const modifyRanges = ranges => ({
  type: types.MODIFY_RANGES,
  ranges,
});
