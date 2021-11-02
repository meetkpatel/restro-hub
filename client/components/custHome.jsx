import React from 'react';
import AppContext from '../lib/app-context';

export default class CustHome extends React.Component {
  render() {
    // const { user, handleSignOut } = this.context;
    return (
      <h1>Hello Customer Comp</h1>
    );
  }
}
CustHome.contextType = AppContext;
