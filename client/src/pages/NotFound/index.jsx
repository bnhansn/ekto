import React from 'react';
import { Link } from 'react-router';

const NotFound = () =>
  <div className="not-found">
    <h1 className="display-3">¡Not found!</h1>
    <Link to="/" className="btn btn-link">Head to home page</Link>
  </div>;

export default NotFound;
