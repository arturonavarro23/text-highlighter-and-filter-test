import React from 'react';
import classnames from 'classnames';

import './Button.scss';

const Button = ({ variant, onClick, selected }) => {
  const btnClass = classnames({
    btn: true,
    [`btn--${variant}`]: true,
    selected,
  });

  return (
    <button
      onClick={onClick}
      className={btnClass}
    />
  );
};

export default Button;
