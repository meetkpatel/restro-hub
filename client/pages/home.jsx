import React from 'react';
import Navbar from '../components/navbar';
import AdminHome from '../components/adminHome';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Home extends React.Component {
  render() {
    if (!this.context.user) {
      return <Redirect to="sign-in" />;
    }
    return (
      <>
        <Navbar title={'Home'}/>
        <AdminHome />
      </>
    );
  }
}
Home.contextType = AppContext;
