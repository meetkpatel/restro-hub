import React from 'react';

function Item(props) {

  return (
    <div className="cart-entries-div">
      <h3>{props.item.itemName}</h3>
      <h3>x{props.item.itemQty}</h3>
    </div>
  );
}

function ListCartItems(props) {

  return (
    <>
      {
        props.cartItemsFetch.map((item, index) => {
          return <Item key={index} item={item} />;
        })
      }
    </>
  );
}

export default ListCartItems;
