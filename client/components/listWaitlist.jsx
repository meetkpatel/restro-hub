import React from 'react';

function Item(props) {

  return (
    <div className="categoty-entries-div">
      <h3>{props.item.userName}</h3>
      <a href={`#tables?userId=${props.item.userId}`}>
        <i className="fas fa-utensils wait-i"></i>
      </a>
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
