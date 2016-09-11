import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import ekto from './ekto.svg';
import editor from './editor.png';
import { signup } from './actions';
import SignupForm from '../../components/SignupForm';
import { colors } from '../../styles/variables';

const styles = StyleSheet.create({
  hero: {
    padding: '100px 0',
    color: '#fff',
    background: colors.primary,
  },

  heroBrand: {
    padding: '30px 0',
    marginBottom: '2rem',
    background: 'rgba(255,255,255,.1)',
  },

  heroHeader: {
    display: 'inline-block',
    marginRight: '.5rem',
  },

  cta: {
    paddingLeft: '2rem',
    fontSize: '2rem',
    borderLeft: '4px solid #fff',
  },

  productDescription: {
    paddingTop: '75px',
    background: '#fff',
  },

  productFeature: {
    marginBottom: '1rem',
    fontSize: '1.1rem',
  },

  editor: {
    width: '100%',
    border: '1px solid rgb(220,220,220)',
    borderBottom: '0',
    borderTopRightRadius: '7px',
    borderTopLeftRadius: '7px',
  },

  productSteps: {
    padding: '100px 0',
    fontSize: '1.25rem',
    borderTop: `1px solid ${colors.grayLighter}`,
    borderBottom: `1px solid ${colors.grayLighter}`,
  },

  productStepNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    color: colors.success,
    border: `1px solid ${colors.success}`,
    borderRadius: '50%',
  },

  appExampleSection: {
    padding: '75px 0',
    fontSize: '1.25rem',
    textAlign: 'center',
    background: '#fff',
  },

  credits: {
    padding: '2rem 0',
    textAlign: 'center',
    background: '#fff',
    borderTop: `1px solid ${colors.grayLighter}`,
  },
});

class Home extends Component {
  static propTypes = {
    signup: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  };

  handleSubmit = (data) => this.props.signup(data);

  render() {
    const { isSubmitting } = this.props;

    return (
      <div>
        <div className={css(styles.hero)}>
          <div className={css(styles.heroBrand)}>
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
            <div className={css(styles.cta)}>
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
        <div className={css(styles.productDescription)}>
          <div className="container">
            <div className="row m-b-3">
              <div className={`col-lg-3 col-sm-6 col-xs-12 ${css(styles.productFeature)}`}>
                <span className="glyphicon glyphicon-book" style={{ marginRight: '10px' }} />
                <b>Simple to publish</b>
                <p>Use our online editor to publish and update content anytime.</p>
              </div>
              <div className={`col-lg-3 col-sm-6 col-xs-12 ${css(styles.productFeature)}`}>
                <span className="glyphicon glyphicon-edit" style={{ marginRight: '10px' }} />
                <b>Powerful editor</b>
                <p>Write in markdown syntax for hassle free content formatting.</p>
              </div>
              <div className={`col-lg-3 col-sm-6 col-xs-12 ${css(styles.productFeature)}`}>
                <span className="glyphicon glyphicon-tasks" style={{ marginRight: '10px' }} />
                <b>Smooth integration</b>
                <p>Retrieve data through our api and integrate directly with your frontend.</p>
              </div>
              <div className={`col-lg-3 col-sm-6 col-xs-12 ${css(styles.productFeature)}`}>
                <span className="glyphicon glyphicon-user" style={{ marginRight: '10px' }} />
                <b>Team support</b>
                <p>Collaborate on blog posts with multiple users.</p>
              </div>
            </div>
            <img src={editor} alt="editor" className={css(styles.editor)} />
          </div>
        </div>
        <div className={css(styles.productSteps)}>
          <div className="container">
            <div className="media m-b-1">
              <div className="media-left">
                <span className={css(styles.productStepNumber)}>1</span>
              </div>
              <div className="media-body media-middle">
                <span>Create an account and publish posts with our online editor.</span>
              </div>
            </div>
            <div className="media m-b-1">
              <div className="media-left">
                <span className={css(styles.productStepNumber)}>2</span>
              </div>
              <div className="media-body media-middle">
                <span>
                  Add your website's url to the account's whitelisted domains to allow
                  blog posts to be retrieved through the api.
                </span>
              </div>
            </div>
            <div className="media m-b-1">
              <div className="media-left">
                <span className={css(styles.productStepNumber)}>3</span>
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
        <div className={css(styles.appExampleSection)}>
          <div className="container">
            <p>
              💁&nbsp;&nbsp;How do I use Ekto on my website?&nbsp;
              <a href="https://github.com/bnhansn/ava">Check out an example React app</a> and&nbsp;
              <a href="http://demo.ekto.tech">view the online demo</a>.
            </p>
          </div>
        </div>
        <div className={css(styles.credits)}>
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
