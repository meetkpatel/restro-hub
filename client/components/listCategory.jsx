import React from 'react';

function Item(props) {

  return (
    <div className="categoty-entries-div">
      <h3>{props.item.categoryName}</h3>
      <i id={props.item.categoryId} className="far fa-trash-alt cursor-poiter" onClick={props.deleteEntries}></i>
    </div>
  );
}

function ListCategory(props) {

  const { deleteEntries } = props;
  return (
    <>
      {
        props.categoryFetch.map(item => {
          return <Item key={item.categoryId} item={item} deleteEntries={deleteEntries}/>;
        })
      }
    </>
  );
}

export default ListCategory;
