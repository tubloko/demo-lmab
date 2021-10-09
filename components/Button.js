import React from 'react';

const Button = ({ onClick, title, style }) => {
  return (
    <button style={style} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
