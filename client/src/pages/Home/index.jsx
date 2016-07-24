import React, { Component } from 'react';

class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <i className="icon icon-cloud2 text-primary" style={{ fontSize: '5rem', marginTop: '9px' }}></i>
            <h1 style={{ fontSize: '5rem', fontWeight: '400' }}>Ekto</h1>
          </div>
          <hr />
          <p className="lead">A blogging platform</p>
        </div>
      </div>
    );
  }
}

export default HomePage;
