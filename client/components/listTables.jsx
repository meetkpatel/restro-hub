import React from 'react';

function tableColor(userId) {
  if (userId) {
    return 'inside-table table-red';
  } else {
    return 'inside-table table-green';
  }
}

function Item(props) {

  return (
    <div className="column-one-fifth justify-center-only">
      <div id={props.item.tableNumber} className={tableColor(props.item.userId)} onClick={(props.item.userId) ? props.freeTable : props.assignTable}>
        <h1 id={props.item.tableNumber}>{props.item.tableNumber}</h1>
      </div>
    </div>
  );
}

function ListTables(props) {
  const { freeTable, assignTable } = props;

  return (
    <>
    <div className="row tables-row-div">
      <div className="tables-div">
        <div className="row">
      {
        props.tablesFetch.map((item, index) => {
          return <Item key={index} item={item} freeTable={freeTable} assignTable={assignTable}/>;
        })
      }
          </div>
        </div>
      </div>
    </>
  );
}

export default ListTables;
