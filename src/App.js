import React from 'react';
import { TextProvider } from './store/providers/textProvider';
import reducer, { initialState } from './store/reducer';
import TextHighlighter from './components/textHighlighter';
import ColorSelector from './components/colorSelector';
import ColorFilters from './components/colorFilters';

import './App.scss';

function App() {
  return (
    <TextProvider initialState={initialState} reducer={reducer}>
      <section className="app">
        <ColorSelector />
        <TextHighlighter />
        <ColorFilters />
      </section>
    </TextProvider>
  );
}

export default App;
