import React from 'react';

export default class AdminHome extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="column-half">

          <div className="menu-div">
            <a href="#admin-menu">
            <i className="fas fa-utensils"></i>
            </a>
            <h3>Menu</h3>
          </div>

        </div>
      </div>
    );
  }
}
