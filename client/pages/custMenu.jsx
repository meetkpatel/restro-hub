import React from 'react';
import Navbar from '../components/navbar';
import RenderCustMenu from '../components/renderCustMenu';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class CustMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuFetch: [],
      isLoading: false,
      isModalOpen: false,
      itemSeleted: [{ itemImg: null }]
    };
    this.itemClicked = this.itemClicked.bind(this);
    this.noBtnClick = this.noBtnClick.bind(this);
    this.yesBtnClick = this.yesBtnClick.bind(this);
    this.qtyClicked = this.qtyClicked.bind(this);

  }

  componentDidMount() {
    fetch('/api/get/menu')
      .then(res => res.json())
      .then(result => {
        this.setState({ menuFetch: result, isLoading: false });
      });
  }

  itemClicked(seletedItem) {
    seletedItem.qty = 1;
    this.setState({ itemSeleted: [seletedItem], isModalOpen: true });
  }

  noBtnClick(event) {
    this.setState({ itemSeleted: [{ itemImg: null }], isModalOpen: false });
  }

  qtyClicked(event) {
    const currentItem = this.state.itemSeleted;
    const currentQty = parseInt(this.state.itemSeleted[0].qty);
    if (event.target.id === 'minus') {
      if (currentQty > 1) {
        currentItem[0].qty = currentQty - 1;
        this.setState({ itemSeleted: currentItem });
      } else {
        currentItem[0].qty = currentQty;
        this.setState({ itemSeleted: currentItem });
      }
    }
    if (event.target.id === 'plus') {
      currentItem[0].qty = currentQty + 1;
      this.setState({ itemSeleted: currentItem });
    }
  }

  yesBtnClick(seletedItem) {
    // this.setState({ itemSeleted: [seletedItem] });
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.context.user.userId,
        itemId: this.state.itemSeleted[0].itemId,
        itemQty: this.state.itemSeleted[0].qty
      })
    };
    fetch('/api/add-item', req)
      .then(res => res.json())
      .then(result => {
        this.setState({ itemSeleted: [{ itemImg: null }], isModalOpen: false });
      });
  }

  render() {
    if (!this.context.user) {
      return <Redirect to="sign-in" />;
    }
    if (this.state.isLoading) {
      return (<p>loading</p>);
    } else {
      return (
        <>
          <Navbar title={'Menu'} />
          <div className="row">
            <div className="column-full">
              <RenderCustMenu menuList={this.state.menuFetch} itemClicked={this.itemClicked}/>
            </div>
          </div>
          <div className={(this.state.isModalOpen) ? 'item-modal-div' : 'item-modal-div hidden'}>
            <div className="item-dispay-div">
              <div className="row">
                <div className="column-full">
                  <img src={this.state.itemSeleted[0].itemImg} className="item-img-modal" alt="" />
                </div>
                <div className="column-full">
                  <h2 className="modal-item-name">{this.state.itemSeleted[0].itemName}</h2>
                </div>
                <div className="column-full modal-item-qty ">
                  <i id="minus" className="fas fa-minus-circle modal-item-qty-i" onClick={this.qtyClicked}></i>
                  <h1>{this.state.itemSeleted[0].qty}</h1>
                  <i id="plus" className="fas fa-plus-circle modal-item-qty-i" onClick={this.qtyClicked}></i>
                </div>
                <div className="column-full item-modal-btn">
                  <button name="isFreeModalSelected" className="red-btn-item" onClick={this.noBtnClick}>Cancle</button>
                  <button name={this.state.openModal} className="green-btn-item" onClick={this.yesBtnClick}>Add</button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

  }
}
CustMenu.contextType = AppContext;
