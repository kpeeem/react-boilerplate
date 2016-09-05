/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import urlParse from 'utils/url';

import Button from 'components/Button';
import H1 from 'components/H1';
import Input from 'react-toolbox/lib/input';

import styles from './styles.css';

export class FeaturePage extends React.Component {
state = { url: ''}
  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  /**
   * Changed route to '/'
   */
  openHomePage = () => {
    this.openRoute('/');
  };

  handleChange = (url, value) => {
    this.setState({...this.state, [url]: value});
  };

  render() {
    let url = new urlParse('https://github.com/foo/bar')
    return (
      <div>
        <H1>PLAYGROUND</H1>
        <Input type='text' label='URL' name='URL' value={this.state.url} onChange={this.handleChange.bind(this, 'url')} maxLength={16 } />
        <article>
        {url.get('href').str}
        </article>
        <Button handleRoute={this.openHomePage}>Home</Button>
      </div>
    );
  }
}
FeaturePage.propTypes = {
  changeRoute: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(FeaturePage);
