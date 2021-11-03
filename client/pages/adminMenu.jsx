import React from 'react';
import Navbar from '../components/navbar';

export default class AdminMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuFetch: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('/api/get/menu')
      .then(res => res.json())
      .then(result => {
        this.setState({ menuFetch: result, isLoading: false });
      });
  }

  render() {

    if (this.state.isLoading) {
      return (<p>loading</p>);
    } else {
      return (
  <>
    <Navbar title={'Menu'} />
    <div className="row">
      <div className="column-full">
        <div className="menu-btn-div">
          <a href="#category"><button>Add Category</button></a>
          <a href="#add-item"><button>Add Items</button></a>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="column-full">
        {/* <RenderMenu menuList={this.state.menuFetch} /> */}
      </div>
    </div>
  </>
      );
    }

  }
}
