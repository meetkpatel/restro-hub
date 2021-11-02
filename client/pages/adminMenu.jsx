import React from 'react';
import AppContext from '../lib/app-context';
import Navbar from '../components/navbar';
import RenderMenu from '../components/renderMenu';

export default class AdminMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuFetch: [],
      isLoading: true
    };
  }

  componentDidMount() {
    /* your code here */
    fetch('/api/get/menu')
      .then(res => res.json())
      .then(result => {
        this.setState({ menuFetch: result, isLoading: false });
      });
  }

  render() {
    // const { user, handleSignOut } = this.context;
    // const { handleSignOut } = this.context;
    // fetch('/api/get/menu')
    //   .then(res => res.json())
    //   .then(result => {
    //     console.log('res', result);
    //     const this.menuFetch = result;
    //     if (result.user && result.token) {
    //       this.context.handleSignIn(result);
    //     }
    //   });
    if (this.state.isLoading) {
      return (<p>loading</p>);
    } else {
      return (
  <>
    <Navbar title={'Menu'} />
    <div className="row">
      <div className="column-full">
        <div className="menu-btn-div">
          <a href="#check"><button>Add Category</button></a>
          <a href="#check"><button>Add Items</button></a>
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
AdminMenu.contextType = AppContext;
