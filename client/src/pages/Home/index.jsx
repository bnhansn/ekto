import React from 'react';

const Home = () =>
  <div>
    <div className="hero">
      <div className="hero-brand">
        <div className="container">
          <h1 className="display-2">Ekto</h1>
        </div>
      </div>
      <div className="container">
        <div className="cta">
          <p>A full stack blogging service.</p>
          <p>Publish on our platform and fetch through a simple api.</p>
        </div>
      </div>
    </div>
    <div className="product-description">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-sm-6 col-xs-12 product-feature">
            <i className="icon icon-book m-r-sm"></i>
            <b>Simple to publish</b>
            <p>Use our online editor to publish and update content anytime.</p>
          </div>
          <div className="col-lg-3 col-sm-6 col-xs-12 product-feature">
            <i className="icon icon-laptop m-r-sm"></i>
            <b>Powerful editor</b>
            <p>Write in markdown syntax for hassle free content formatting.</p>
          </div>
          <div className="col-lg-3 col-sm-6 col-xs-12 product-feature">
            <i className="icon icon-database-refresh m-r-sm"></i>
            <b>Smooth integration</b>
            <p>Retrieve data through our api and integrate directly with your frontend.</p>
          </div>
          <div className="col-lg-3 col-sm-6 col-xs-12 product-feature">
            <i className="icon icon-users4 m-r-sm"></i>
            <b>Team support</b>
            <p>Collaborate on blog posts as a team.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="product-steps">
    </div>
  </div>;

export default Home;
