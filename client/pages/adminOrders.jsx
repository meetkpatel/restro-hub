import React from 'react';
import Navbar from '../components/navbar';
import ListOrders from '../components/listOrders';
import ListModalOrders from '../components/listModalOrders';

import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import NotFound from './not-found';
const { io } = require('socket.io-client');

export default class AdminOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersFetch: [],
      isLoading: false,
      isModalOpen: false,
      orderSeleted: { }
    };
    this.orderClicked = this.orderClicked.bind(this);
    this.noBtnClick = this.noBtnClick.bind(this);
    this.modalBtnClicked = this.modalBtnClicked.bind(this);

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

  noBtnClick(event) {
    this.setState({ orderSeleted: {}, isModalOpen: false });
  }

  orderClicked(seletedOrder) {
    this.setState({ orderSeleted: seletedOrder, isModalOpen: true });
  }

  modalBtnClicked(event) {
    const cartId = this.state.orderSeleted.cartId;
    const action = (event.target.name === 'preparing') ? 'preparing' : 'finished';

    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action })
    };
    fetch(`/api/update-order-status/${cartId}`, req)
      .then(res => res.json())
      .then(result => {
        const newdata = this.state.ordersFetch.map(olddata => {
          if (olddata.cartId === this.state.orderSeleted.cartId) {
            if (action === 'preparing') {
              olddata.orderStatus = 'preparing';
              return olddata;
            } else {
              return null;
            }
          } else {
            return olddata;
          }
        });
        const newState = newdata.filter(Boolean);
        this.setState({ ordersFetch: newState, isModalOpen: false });
      });
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
            {<ListOrders ordersFetch={this.state.ordersFetch} orderClicked={this.orderClicked}/>}
          </div>
          <div className={(this.state.isModalOpen) ? 'item-modal-div' : 'item-modal-div hidden'}>
            <div className="order-modal-div">
              <div className="row">
                <div className="column-full order-table-order-div">
                  <h2>Table No {this.state.orderSeleted.tableNumber}</h2>
                  <h2>#{this.state.orderSeleted.orderId}</h2>
                </div>
                {(this.state.isModalOpen) ? <ListModalOrders orderSeleted={this.state.orderSeleted.items} /> : ''}
                <div className="column-full">
                  <h3>Note: {this.state.orderSeleted.orderNote}</h3>
                </div>
                <div className="column-full modal-btn-div">
                  <button className="red-btn-orders" onClick={this.noBtnClick}>Close</button>
                  {(this.state.orderSeleted.orderStatus === 'Received')
                    ? <button name="preparing" className="orange-btn-orders" onClick={this.modalBtnClicked}>Start Preparing</button>
                    : <button name="ready" className="green-btn-orders" onClick={this.modalBtnClicked}>Ready</button>}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

  }
}
AdminOrders.contextType = AppContext;
