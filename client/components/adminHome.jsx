import React from 'react';

export default class AdminHome extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="column-half">
          <a href="#admin-menu">
          <div className="menu-div">
            <i className="fas fa-utensils"></i>
            <h3>Menu</h3>
          </div>
          </a>
        </div>
      </div>
    );
  }
}
