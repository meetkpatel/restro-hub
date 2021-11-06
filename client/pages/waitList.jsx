import React from 'react';
import Navbar from '../components/navbar';
import ListWaitList from '../components/listWaitlist';

export default class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waitListFetch: [],
      isLoading: true,
      addcustname: '',
      addcustmobile: ''

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/get/waitlist')
      .then(res => res.json())
      .then(result => {
        this.setState({ waitListFetch: result, isLoading: false });
      });
  }

  handleInputChange(event) {
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
    fetch('/api/add/waitlist', req)
      .then(res => res.json())
      .then(result => {
        this.setState({ waitListFetch: this.state.waitListFetch.concat(result), addcustname: '', addcustmobile: '' });
      });

  }

  render() {
    const { handleInputChange, handleSubmit } = this;
    if (this.state.isLoading) {
      return (
        <p>loading</p>
      );
    } else {
      return (
        <>
          <Navbar title={'Waitlist'} />
          <div className="row">
            <div className="column-full">
              <form onSubmit={handleSubmit}>
                <div className="add-waitlist-div">
                    <input
                      required
                      autoFocus
                      id="addcustname"
                      type="text"
                      name="addcustname"
                      placeholder="Add Customer Name"
                      onChange={handleInputChange}
                      value={this.state.addcustname}
                      className="form-control bg-light" />
                </div>
                <div className="add-waitlist-div">
                    <input
                      required
                      autoFocus
                      id="addcustmobile"
                      type="text"
                      name="addcustmobile"
                      placeholder="Add Customer Mobile Number"
                    onChange={handleInputChange}
                    value={this.state.addcustmobile}
                      className="form-control bg-light" />
                </div>
                <div className="add-waitlist-div">
                  <button type="submit">
                    Add Customer
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="column-full justify-center-only">
              <div className="category-list-div">
                {<ListWaitList waitListFetch={this.state.waitListFetch} />}
              </div>
            </div>
          </div>
        </>
      );
    }

  }
}
