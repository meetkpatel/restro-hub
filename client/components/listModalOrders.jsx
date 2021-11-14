import React from 'react';

function GetItem(props) {

  return (
    <div className="column-full order-qty-name-div">
      <h3>x{props.item.quantity}</h3>
      <h3>{props.item.itemName}</h3>
    </div>
  );
}

function ListModalOrders(props) {

  return (
    <>
      {
        props.orderSeleted.map((item, index) => {
          return <GetItem key={index} item={item} />;
        })
        }
    </>
  );
}

export default ListModalOrders;
