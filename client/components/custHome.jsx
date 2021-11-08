import React from 'react';
import AppContext from '../lib/app-context';
import Navbar from '../components/navbar';

export default class CustHome extends React.Component {
  render() {
    return (
      <>
        <Navbar title={'Home'} />
      <h1>Hello Customer</h1>
      </>
    );
  }
}
CustHome.contextType = AppContext;
