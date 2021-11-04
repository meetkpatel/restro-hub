import React from 'react';

function Item(props) {
  return (
      <option value={props.item.categoryId}>{props.item.categoryName}</option>
  );
}

function ListCategoryDropDown(props) {
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

export default ListCategoryDropDown;
