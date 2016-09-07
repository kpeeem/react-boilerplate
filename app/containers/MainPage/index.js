/*
 * MainPage
 */
import React from 'react';
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import urlParse from 'utils/url';
import uri from 'urijs';
import Playground from 'component-playground';
// import Preview from 'containers/Preview';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import JsonView from 'containers/JsonView';
import StatisticsBars from 'containers/StatisticsBars';
import H1 from 'components/H1';

require('codemirror/mode/javascript/javascript');

import styles from './styles.css';

let componentExample = `<H1>Hi</H1>`;
let StatisticsBarsRaw = require("raw!containers/StatisticsBars/index.js");

export class MainPage extends React.Component {
  state = {
    url: 'https://github.com/foo/bar',
    statistics:false,
    demo: StatisticsBarsRaw
  };
  /**
   * Changes the routereact-hmre
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  /**
   * Changed route to '/'
   */
  openHomePage () {
    this.openRoute('/');
  };

  handleChange = (url, value) => {
    this.setState({...this.state, [url]: value});
  };

  componentWillMount(){
    let jsn = fetch('http://films.imhonet.ru/web.php?path=element/187631/&domain=films',{
          headers: {
            "Accept":"application/json",
      "X-Requested-With":"XMLHttpRequest"
          }
      }
    ).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(response => {
        this.setState({statistics:response.content.content.statistics})    
    });
  }

  onChangeCode(code) {
    const demo = this.state.demo;

    demo.code = code;

    this.setState({demo});
  }

  render() {
    return (
            <div>

              <input
                label="My Input"
                placeholder="My Input"
                value={this.state.url}
                onChange={this.handleChange.bind(this, 'url')}
              />
              <JsonView data={uri(this.state.url).query('werwerew')} />
              <JsonView data={uri(this.state.url).directory('element')} />
              <p className={styles.text}>{uri(this.state.url).href()}</p>

              <Playground codeText={componentExample} noRender={false} scope={{React: React, H1: H1}}/>
              {this.state.statistics && <Playground codeText={StatisticsBarsRaw} noRender={false} scope={{React: React, DATA:this.state.statistics, ReactDOM:ReactDOM , StatisticsBars: StatisticsBars}}/>}


              {this.state.statistics && <StatisticsBars data={this.state.statistics} />}
              
            </div>

      );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url))
  };
}

export default connect(null, mapDispatchToProps)(MainPage);
