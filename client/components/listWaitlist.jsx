import React from 'react';

function Item(props) {

  return (
    <div className="categoty-entries-div">
      <h3>{props.item.userName}</h3>
    </div>
  );
}

function ListWaitList(props) {
  return (
    <>
      {
        props.waitListFetch.map((item, index) => {
          return <Item key={index} item={item} />;
        })
      }
    </>
  );
}

export default ListWaitList;
