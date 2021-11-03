import React from 'react';
import AppContext from '../lib/app-context';
import Navbar from '../components/navbar';
import ListCategory from '../components/listCategory';

export default class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      itemName: '',
      itemPrice: '',
      itemDesc: '',
      itemImg: 'blank.jpeg'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    // fetch('/api/add/category', req)
    //   .then(res => res.json())
    //   .then(result => {
    //     this.setState({ categoryFetch: this.state.categoryFetch.concat(result) });
    //   });
  }

  render() {
    const { handleChange, handleSubmit } = this;

    return (
        <>
          <Navbar title={'Add Items'} />
          <div className="row">
          <div className="column-full justify-center-only">
            <form className="form-elements" onSubmit={handleSubmit}>
              <div className="row">
                <div className="column-half">
                  <img src={this.state.itemImg} id="imageDisplay" alt="Journal Image"></img>
                </div>
                <div className="column-half">
                  <div>
                    <input type="text" id="title" name="title" required></input>
                  </div>
                  <div >
                    <input type="text" id="title" name="title" required></input>
                  </div>
                </div>

              </div>
            </form>
            </div>
          </div>
          {/* <div className="row">
            <div className="column-full">
              <form onSubmit={handleSubmit}>
                <div className="add-category-div">
                  <input
                    required
                    autoFocus
                    id="addcategory"
                    type="text"
                    name="addcategory"
                    placeholder="Add Category"
                    onChange={handleChange}
                    className="form-control bg-light" />
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="column-full justify-center-only">
              <div className="category-list-div">
                {<ListCategory categoryFetch={this.state.categoryFetch} />}
              </div>
            </div>
          </div> */}
        </>
    );
  }
}

AddItem.contextType = AppContext;
