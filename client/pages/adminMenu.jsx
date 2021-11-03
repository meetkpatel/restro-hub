import React from 'react';
import Navbar from '../components/navbar';

export default class AdminMenu extends React.Component {

  render() {
    return (
  <>
    <Navbar title={'Menu'} />
    <div className="row">
      <div className="column-full">
        <div className="menu-btn-div">
          <a href="#category"><button>Add Category</button></a>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="column-full">
      </div>
    </div>
  </>
    );

  }
}
