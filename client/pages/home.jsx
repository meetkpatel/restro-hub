import React from 'react';
import AdminHome from '../components/adminHome';
import CustHome from '../components/custHome';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Home extends React.Component {
  render() {
    if (!this.context.user) {
      return <Redirect to="sign-in" />;
    }
    if (this.context.user.userRole === 'Admin') {
      return <AdminHome />;
    }
    if (this.context.user.userRole === 'Customer') {
      return <CustHome />;
    }
    return (
      <>
        {this.renderPage()}
      </>
    );
  }
}
Home.contextType = AppContext;
