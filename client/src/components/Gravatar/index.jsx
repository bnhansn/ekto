import React, { PropTypes } from 'react';
import md5 from 'md5';

const Gravatar = ({ email, size, className }) => {
  const hash = md5(email);
  const src = `https://secure.gravatar.com/avatar/${hash}?s=${size || 48}`;

  return <img src={src} alt={email} className={className || ''} />;
};

Gravatar.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  email: PropTypes.string.isRequired,
};

export default Gravatar;
