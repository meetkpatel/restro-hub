import React from 'react';

export default class AdminHome extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="column-full home-flex ">
          <div className="menu-div">
            <a href="#admin-menu">
              <i className="fas fa-utensils menu-i-tag"></i>
            </a>
            <h3>Menu</h3>
          </div>
            <div className="menu-div">
              <a href="#waitlist">
              <i className="fas fa-users  menu-i-tag" ></i>
              </a>
              <h3>Waitlist</h3>
            </div>
        </div>
      </div>
    );
  }
}
