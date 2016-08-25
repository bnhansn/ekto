import editor from './editor.png';
import { signup } from './actions';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import SignupForm from '../../components/SignupForm';

class Home extends Component {
  static propTypes = {
    signup: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  };

  handleSubmit(data) {
    this.props.signup(data);
  }

  render() {
    const { isSubmitting } = this.props;

    return (
      <div>
        <div className="hero">
          <div className="hero-brand">
            <div className="container">
              <h1 className="display-2 hero-header">Ekto</h1>
              <span className="hero-beta">beta</span>
            </div>
          </div>
          <div className="container">
            <div className="cta">
              <p>A full stack blogging service.</p>
              <p>Publish on our platform and fetch through a simple api.</p>
            </div>
            <SignupForm isSubmitting={isSubmitting} onSubmit={::this.handleSubmit} />
          </div>
        </div>
        <div className="p-y-3">
          <div className="container">
            <p className="lead m-b-0">
              Ekto provides an easy solution for integrating blog content into
              single page JavaScript applications.
            </p>
          </div>
        </div>
        <div className="product-description">
          <div className="container">
            <div className="row m-b-3">
              <div className="col-lg-3 col-sm-6 col-xs-12 product-feature">
                <i className="icon icon-laptop m-r-sm"></i>
                <b>Simple to publish</b>
                <p>Use our online editor to publish and update content anytime.</p>
              </div>
              <div className="col-lg-3 col-sm-6 col-xs-12 product-feature">
                <i className="icon icon-file-text m-r-sm"></i>
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
                <p>Collaborate on blog posts with multiple users.</p>
              </div>
            </div>
            <img src={editor} alt="editor" className="editor img-fluid" />
          </div>
        </div>
        <div className="product-steps">
          <div className="container">
            <div className="media">
              <div className="media-left">
                <span className="product-step-number">1</span>
              </div>
              <div className="media-body media-middle">
                <span>Create an account and publish posts with our online editor.</span>
              </div>
            </div>
            <div className="media">
              <div className="media-left">
                <span className="product-step-number">2</span>
              </div>
              <div className="media-body media-middle">
                <span>
                  Add your website's url to the account's whitelisted domains to allow
                  blog posts to be retrieved through the api.
                </span>
              </div>
            </div>
            <div className="media">
              <div className="media-left">
                <span className="product-step-number">3</span>
              </div>
              <div className="media-body media-middle">
                <span>
                  Query the Ekto api from your application to display the blog content
                  on your website.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="app-example-section">
          <div className="container">
            <p>
              💁&nbsp;&nbsp;How do I add an Ekto blog to my website? <a href="https://github.com/bnhansn/ekto">Check out an example React app (coming soon)</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    isSubmitting: state.signup.isSubmitting,
  }),
  { signup }
)(Home);