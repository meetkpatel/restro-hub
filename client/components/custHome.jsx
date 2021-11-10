import React from 'react';
import AppContext from '../lib/app-context';
import Navbar from '../components/navbar';

export default class CustHome extends React.Component {
  render() {
    return (
      <>
        <Navbar title={'Home'} />
        <div className="row">
          <div className="column-full home-flex ">
            <div className="menu-div">
              <a href="#cust-menu">
                <i className="fas fa-utensils menu-i-tag"></i>
              </a>
              <h3>Menu</h3>
            </div>
            <div className="menu-div">
              <a href="#cust-cart">
                <i className="fas fa-shopping-basket menu-i-tag"></i>
              </a>
              <h3>Cart</h3>
            </div>
          </div>
        </div>
      </>
    );
  }
}
CustHome.contextType = AppContext;
