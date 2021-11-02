import React from 'react';
import Redirect from '../components/redirect';
import Navbar from '../components/navbar';
import AdminHome from '../components/adminHome';
import CustHome from '../components/custHome';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  renderPage() {
    if (this.context.user.userRole === 'Admin') {
      return <AdminHome />;
    }
    if (this.context.user.userRole === 'Customer') {
      return <CustHome />;
    }
  }

  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <>
        <Navbar title={'Home'}/>
        {this.renderPage()}
      </>
    );
  }
}
Home.contextType = AppContext;
