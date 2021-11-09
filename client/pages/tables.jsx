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
      openModal: null,
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
    this.setState({ openModal: 'free', tableSelected: parseInt(event.target.id) });
  }

  assignTable(event) {
    this.setState({ openModal: 'assign', tableSelected: parseInt(event.target.id) });
  }

  noBtnClick(event) {
    this.setState({ openModal: null, tableSelected: null });
  }

  yesBtnClick(event) {
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: (event.target.name === 'free') ? null : JSON.stringify({ custId: this.props.userId })
    };
    fetch((event.target.name === 'free') ? `/api/table/${this.state.tableSelected}` : `/api/table-assign/${this.state.tableSelected}`, req)
      .then(res => res.json())
      .then(result => {
        const newTables = this.state.tablesFetch.map(oldTable => {
          if (oldTable.tableNumber === this.state.tableSelected) {
            return result;
          } else {
            return oldTable;
          }
        });
        this.setState({ tablesFetch: newTables, openModal: null, tableSelected: null });
      });
    // for (let i = 0; i < this.state.tablesFetch.length; i++) {
    //   if (this.state.tablesFetch[i].tableNumber === parseInt(this.state.tableSelected)) {
    //     const newdata = this.state.tablesFetch.slice(i, i + 1);
    //     (event.target.name === 'free') ? newdata[0].userId = null : newdata[0].userId = this.props.userId;
    //     const newstate = this.state.tablesFetch.slice(0, i).concat(newdata[0]).concat(this.state.tablesFetch.slice(i + 1));
    //     this.setState({ tablesFetch: newstate, openModal: null, tableSelected: null });
    //   }
    // }
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
          <div className={(this.state.openModal) ? 'free-table-modal-div' : 'free-table-modal-div hidden'}>
            <div className="free-table-content-div">
              <div className="row">
                <div className="column-full justify-center-only">
                  <h3> {(this.state.openModal) === 'free' ? `Free Table No ${this.state.tableSelected}` : `Assign Table No ${this.state.tableSelected}`}</h3>
                </div>
              </div>
              <div className="row free-table-row-btn">
                <button name="isFreeModalSelected" className="red-btn" onClick={noBtnClick}>No</button>
                <button name={this.state.openModal} className="green-btn" onClick={yesBtnClick}>Yes</button>
              </div>
            </div>
          </div>
      </>
      );
    }
  }
}
Tables.contextType = AppContext;
