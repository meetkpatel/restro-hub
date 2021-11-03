import React from 'react';
import Navbar from '../components/navbar';
import ListCategory from '../components/listCategory';

export default class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryFetch: [],
      isLoading: true,
      addcategory: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    /* your code here */
    fetch('/api/get/category')
      .then(res => res.json())
      .then(result => {
        this.setState({ categoryFetch: result, isLoading: false });
      });
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
    fetch('/api/add/category', req)
      .then(res => res.json())
      .then(result => {
        this.setState({ categoryFetch: this.state.categoryFetch.concat(result) });
      });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    if (this.state.isLoading) {
      return (
        <p>loading</p>
      );
    } else {
      return (
        <>
          <Navbar title={'Category'} />
          <div className="row">
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
          </div>
        </>
      );
    }

  }
}
