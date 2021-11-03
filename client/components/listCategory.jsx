import React from 'react';

function Item(props) {
  return (
    <div className="categoty-entries-div">
      <h3>{props.item.categoryName}</h3>
      <i className="far fa-trash-alt"></i>
    </div>
  );
}

function ListCategory(props) {
  return (
    <>
      {
        props.categoryFetch.map(item => {
          return <Item key={item.categoryId} item={item} />;
        })
      }
    </>
  );
}

export default ListCategory;
