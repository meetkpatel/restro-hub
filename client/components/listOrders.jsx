import React from 'react';

function GetItem(props) {

  return (
    <div className="column-full order-qty-name-div ">
      <h3>x{props.item.quantity}</h3>
      <h3>{props.item.itemName}</h3>
    </div>
  );
}

function Item(props) {
  return (
    <div className="column-one-third justify-center-only">
      <div className="order-div">
        <div className="column-full order-table-order-div">
          <h2>Table No: {props.item.tableNumber}</h2>
          <h2>#{props.item.orderId}</h2>
        </div>
        {
            props.item.items.map((item, index) => {
              return <GetItem key={index} item={item} />;
            })
        }
        <div className="column-full order-table-order-div">
          <h3>Note: {props.item.orderNote}</h3>
        </div>
      </div>
    </div>
  );
}

function ListOrders(props) {
  return (
    <>
      <div className="column-full justify-center-only">
        <div className="cust-orders-div ">
          <div className="row">
            {
              props.ordersFetch.map((item, index) => {
                return <Item key={index} item={item} />;
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default ListOrders;
