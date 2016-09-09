import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import ekto from './ekto.svg';
import editor from './editor.png';
import { signup } from './actions';
import SignupForm from '../../components/SignupForm';

class Home extends Component {
  static propTypes = {
    signup: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  };

  @autobind
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
              <img
                src={ekto}
                alt="Ekto"
                className="d-block m-x-auto"
                style={{ maxWidth: '100%' }}
              />
            </div>
          </div>
          <div className="container">
            <div className="cta">
              <p>A blogging microservice</p>
              <p>Publish on our platform and fetch through a simple api</p>
            </div>
            <SignupForm isSubmitting={isSubmitting} onSubmit={this.handleSubmit} />
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
                <i className="icon icon-laptop m-r-sm" />
                <b>Simple to publish</b>
                <p>Use our online editor to publish and update content anytime.</p>
              </div>
              <div className="col-lg-3 col-sm-6 col-xs-12 product-feature">
                <i className="icon icon-file-text m-r-sm" />
                <b>Powerful editor</b>
                <p>Write in markdown syntax for hassle free content formatting.</p>
              </div>
              <div className="col-lg-3 col-sm-6 col-xs-12 product-feature">
                <i className="icon icon-database-refresh m-r-sm" />
                <b>Smooth integration</b>
                <p>Retrieve data through our api and integrate directly with your frontend.</p>
              </div>
              <div className="col-lg-3 col-sm-6 col-xs-12 product-feature">
                <i className="icon icon-users4 m-r-sm" />
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
              💁&nbsp;&nbsp;How do I use Ekto on my website?&nbsp;
              <a href="https://github.com/bnhansn/ava">Check out an example React app</a> and&nbsp;
              <a href="http://demo.ekto.tech">view the online demo</a>.
            </p>
          </div>
        </div>
        <div className="credits">
          <div className="container">
            <div>Developed at <a href="https://techbient.com">Techbient</a></div>
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
