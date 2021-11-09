import React from 'react';
import AppContext from '../lib/app-context';
// import Redirect from '../components/redirect';
import Navbar from '../components/navbar';
import ListTables from '../components/listTables';

export default class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tablesFetch: [],
      isLoading: true,
      isFreeModalSelected: false,
      isAssignModalSelected: false,
      tableSelected: null
    };
    this.freeTable = this.freeTable.bind(this);
    this.assignTable = this.assignTable.bind(this);
    this.noBtnClick = this.noBtnClick.bind(this);
    this.yesBtnClick = this.yesBtnClick.bind(this);

  }

  componentDidMount() {
    fetch('/api/get/tables')
      .then(res => res.json())
      .then(result => {
        this.setState({ tablesFetch: result, isLoading: false });
      });
  }

  freeTable(event) {
    this.setState({ isFreeModalSelected: true, tableSelected: event.target.id });
  }

  assignTable(event) {
    this.setState({ isAssignModalSelected: true, tableSelected: event.target.id });
  }

  noBtnClick(event) {
    this.setState({ [event.target.name]: false, tableSelected: null });
  }

  yesBtnClick(event) {
    if (event.target.name === 'isFreeModalSelected') {
      const req = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: null
      };
      fetch(`/api/put/table/${this.state.tableSelected}`, req)
        .then(res => res.json())
        .then(result => {
        });
      for (let i = 0; i < this.state.tablesFetch.length; i++) {
        if (this.state.tablesFetch[i].tableNumber === parseInt(this.state.tableSelected)) {
          const newdata = this.state.tablesFetch.slice(i, i + 1);
          newdata[0].userId = null;
          const newstate = this.state.tablesFetch.slice(0, i).concat(newdata[0]).concat(this.state.tablesFetch.slice(i + 1));
          this.setState({ tablesFetch: newstate, isFreeModalSelected: false, tableSelected: null });
        }
      }
    } if (event.target.name === 'isAssignModalSelected') {
      const req = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ custId: this.props.userId })
      };
      fetch(`/api/put/table-assign/${this.state.tableSelected}`, req)
        .then(res => res.json())
        .then(result => {
        });
      for (let i = 0; i < this.state.tablesFetch.length; i++) {
        if (this.state.tablesFetch[i].tableNumber === parseInt(this.state.tableSelected)) {
          const newdata = this.state.tablesFetch.slice(i, i + 1);
          newdata[0].userId = this.props.userId;
          const newstate = this.state.tablesFetch.slice(0, i).concat(newdata[0]).concat(this.state.tablesFetch.slice(i + 1));
          this.setState({ tablesFetch: newstate, isAssignModalSelected: false, tableSelected: null });
        }
      }
    }
  }

  render() {

    const { freeTable, assignTable, noBtnClick, yesBtnClick } = this;
    if (this.state.isLoading) {
      return (
        <p>loading</p>
      );
    } else {
      return (
      <>
        <Navbar title={'Tables'} />
          <ListTables tablesFetch={this.state.tablesFetch} freeTable={freeTable} assignTable={assignTable}/>
          <div className={(this.state.isFreeModalSelected) ? 'free-table-modal-div' : 'free-table-modal-div hidden'}>
            <div className="free-table-content-div">
              <div className="row">
                <div className="column-full justify-center-only">
                  <h3>Free Table No {this.state.tableSelected}</h3>
                </div>
              </div>
              <div className="row free-table-row-btn">
                <button name="isFreeModalSelected" className="red-btn" onClick={noBtnClick}>No</button>
                <button name="isFreeModalSelected" className="green-btn" onClick={yesBtnClick}>Yes</button>
              </div>
            </div>
          </div>
          <div className={(this.state.isAssignModalSelected) ? 'assign-table-modal-div' : 'assign-table-modal-div hidden'}>
            <div className="assign-table-content-div">
              <div className="row">
                <div className="column-full justify-center-only">
                  <h3>Assign Table No {this.state.tableSelected}</h3>
                </div>
              </div>
              <div className="row assign-table-row-btn">
                <button name="isAssignModalSelected" className="red-btn" onClick={noBtnClick}>No</button>
                <button name="isAssignModalSelected" className="green-btn" onClick={yesBtnClick}>Yes</button>
              </div>
            </div>
          </div>
      </>
      );
    }
  }
}
Tables.contextType = AppContext;
