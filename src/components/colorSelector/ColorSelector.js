import React from 'react';
import { useStateValue } from '../../store/providers/textProvider';
import { setColor } from '../../store/actions';
import Button from '../common/button';

const ColorSelector = () => {
  const [{ colors, selectedColor }, dispatch] = useStateValue();

  const onColorButtonClick = color => () => {
    dispatch(setColor(selectedColor === color ? null : color));
  }

  const renderButton = color => (
    <Button
      key={color}
      variant={color}
      onClick={onColorButtonClick(color)}
      selected={color === selectedColor}
    />
  );

  return (
    <React.Fragment>
      <h1>
        Colors
      </h1>
      {colors.map(renderButton)}
    </React.Fragment>
  );
}

export default ColorSelector;
