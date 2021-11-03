import React from 'react';
import Navbar from '../components/navbar';
import AdminHome from '../components/adminHome';

export default class Home extends React.Component {
  renderPage() {

  }

  render() {

    return (
      <>
        <Navbar title={'Home'}/>
        <AdminHome />
      </>
    );
  }
}
