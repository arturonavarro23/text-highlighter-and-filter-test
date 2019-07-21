import React from 'react';
import { useStateValue } from '../../store/providers/textProvider';
import { removeFilter, addFilter } from '../../store/actions';
import Button from '../common/button';

import './ColorFilters.scss';

const ColorFilters  = () => {
  const [{
    colors,
    selectedFilters,
    ranges,
    text
  }, dispatch] = useStateValue();

  const onClick = color => () => {
    // check if filter is already active to toggle the state
    if (selectedFilters.includes(color)) {
      dispatch(removeFilter(color));
    } else {
      dispatch(addFilter(color));
    }
  };

  const renderButton = color => (
    <Button
      key={color}
      variant={color}
      onClick={onClick(color)}
      selected={selectedFilters.includes(color)}
    />
  );

  const printFilteredText = color => {
    // get words from active color filter
    const highlights = ranges.filter(r => r.color === color)
      .map(t => {
        const word = text.substring(t.start, t.end);
        return(
          <React.Fragment key={`${t.start}-${t.end}`}>
            <span className={color}>
              {word}
            </span>
            <br />
          </React.Fragment>
        );
      });

    return (
      <React.Fragment key={`${color}-text`}>
        <h4>
          {color}
        </h4>
        {highlights}
      </React.Fragment>
    );
  };

  return(
    <div className="color-filters">
      <h1>
        Filters
      </h1>
      {colors.map(renderButton)}
      <div className="filtered-text">
        {selectedFilters.map(printFilteredText)}
      </div>
    </div>
  );
};

export default ColorFilters;
