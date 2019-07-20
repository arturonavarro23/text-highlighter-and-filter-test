import React, { createContext, useContext, useReducer } from 'react';

export const TextContext = createContext();

export const TextProvider = ({ reducer, initialState, children }) => (
  <TextContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </TextContext.Provider>
);

export const useStateValue = () => useContext(TextContext);
