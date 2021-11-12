import React from 'react';
import Navbar from '../components/navbar';
import ListOrders from '../components/listOrders';

import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import NotFound from './not-found';
const { io } = require('socket.io-client');

export default class AdminOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersFetch: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on('order_placed', arg => {
      const orderId = parseInt(arg.orderId); // 1
      const req = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: null
      };
      fetch(`/api/fetch-orders-socket/${orderId}`, req)
        .then(res => res.json())
        .then(result => {
          this.setState({ cartItemsFetch: this.state.ordersFetch.push(result) });
        });
    });
    fetch('/api/fetch-orders')
      .then(res => res.json())
      .then(result => {
        this.setState({ ordersFetch: result, isLoading: false });
      });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    if (!this.context.user) {
      return <Redirect to="sign-in" />;
    }
    if (this.context.user.userRole === 'Customer') {
      return <NotFound />;
    }
    if (this.state.isLoading) {
      return (<p>loading</p>);
    } else {
      return (
        <>
          <Navbar title={'Orders'} />
          <div className="row">
            {<ListOrders ordersFetch={this.state.ordersFetch} />}
          </div>
        </>
      );
    }

  }
}
AdminOrders.contextType = AppContext;
