import React from 'react';
import { Link } from 'react-router';
import { colors } from '../../styles/settings';

const NotFound = () =>
  <div style={{ padding: '100px 0', color: colors.gray, textAlign: 'center' }}>
    <p>Page not found</p>
    <p><Link to="/">Go to the home page →</Link></p>
  </div>;

export default NotFound;
