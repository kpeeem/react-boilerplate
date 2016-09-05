/*
 * MainPage
 */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import urlParse from 'utils/url';
import uri from 'urijs';
import Playground from 'component-playground';
import fetch from 'node-fetch';

import {Button} from 'react-toolbox/lib/button';
import JsonView from 'containers/JsonView';
import StatisticsBars from 'containers/StatisticsBars';
import H1 from 'components/H1';
import Input from 'react-toolbox/lib/input';
import { AppBar, Checkbox, IconButton } from 'react-toolbox';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';

require('codemirror/mode/javascript/javascript');

import styles from './styles.css';

let componentExample = "<Button style={{background: '#3498db'}}>Hi</Button>";
let StatisticsBarsRaw = require("raw!containers/StatisticsBars/index.example");

export class MainPage extends React.Component {
  state = { 
    url: 'https://github.com/foo/bar',
    drawerActive: false,
    drawerPinned: false,
    sidebarPinned: false,
    statistics:false
  }
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

  toggleDrawerActive = () => {
        this.setState({ drawerActive: !this.state.drawerActive });
  };

  toggleDrawerPinned = () => {
      this.setState({ drawerPinned: !this.state.drawerPinned });
  }

  toggleSidebar = () => {
      this.setState({ sidebarPinned: !this.state.sidebarPinned });
  }; 

  render() {
  let jsn = fetch('http://films.imhonet.ru/web.php?path=element/187631/&domain=films',{  
        headers: {  
          "Accept":"application/json",
    "X-Requested-With":"XMLHttpRequest"
        }
    }
  )
  .then(json).then(function(response) {  
      this.setState(statistics:response.content.content.statistics) 
  })
    return (
        <Layout>
          <NavDrawer active={this.state.drawerActive}
              pinned={this.state.drawerPinned} permanentAt='xxxl'
              onOverlayClick={ this.toggleDrawerActive }>
              <p>
                  Navigation, account switcher, etc. go here.
              </p>
          </NavDrawer>
          <Panel>
              <AppBar><IconButton icon='menu' inverse={ true } onClick={ this.toggleDrawerActive }/></AppBar>
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                  <Input type='text' label='URL' name='URL' value={this.state.url} onChange={this.handleChange.bind(this, 'url')} />
                  <JsonView data={uri(this.state.url).query('werwerew')} />
                  <JsonView data={uri(this.state.url).directory('element')} />
                  <p className={styles.text}>{uri(this.state.url).href()}</p>

                  <Playground codeText={componentExample} scope={{React: React, Button: Button}}/>
                  {this.state.statistics && <StatisticsBars data={this.state.statistics} />}
                  {<Playground codeText={StatisticsBarsRaw} scope={{React: React, StatisticsBars: StatisticsBars}}/>}
              </div>
          </Panel>
        
      </Layout>

    );
  }
}
MainPage.propTypes = {
  changeRoute: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(MainPage);
