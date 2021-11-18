import React from 'react';
import Home from './pages/home';
import AdminMenu from './pages/adminMenu';
import CustMenu from './pages/custMenu';
import CustCart from './pages/custCart';
import CustOrderStatus from './pages/custOrderStatus';

import NotFound from './pages/not-found';

import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';
import AddCategory from './pages/category';
import AddItem from './pages/addItems';
import Waitlist from './pages/waitList';
import AuthPage from './pages/auth';
import Tables from './pages/tables';
import AdminOrders from './pages/adminOrders';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { path, params } = this.state.route;
    if (path === '') {
      return <Home />;
    } if (path === 'sign-in') {
      return <AuthPage />;
    } if (path === 'admin-menu') {
      return <AdminMenu />;
    } if (path === 'admin-orders') {
      return <AdminOrders />;
    } if (path === 'cust-menu') {
      return <CustMenu />;
    } if (path === 'cust-cart') {
      return <CustCart />;
    } if (path === 'cust-order-status') {
      return <CustOrderStatus />;
    } if (path === 'category') {
      return <AddCategory />;
    } if (path === 'add-item') {
      return <AddItem />;
    } if (path === 'waitlist') {
      return <Waitlist />;
    } if (path === 'tables') {
      const userId = params.get('userId');
      return <Tables userId={userId} />;
    }
    return <NotFound />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
            {this.renderPage()}
        </>
      </AppContext.Provider>
    );
  }
}
App.contextType = AppContext;
