import React from 'react';

function Item(props) {
  return (
    <div className="column-half">
      <div className="food-item-div">
        <img src={props.item.itemImg} alt="" />
        <div className="row width-full">
          <div className="column-full name-price-div">
            <h2>{props.item.itemName}</h2>
            <h3><span className="price-span">${props.item.itemPrice}</span></h3>
          </div>
          <div className="column-full">
          <h4>{props.item.itemDescription}</h4>
          </div>

        </div>
      </div>
    </div>
  );
}

function Cate(props) {
  return (
    <div className="column-full margin-half-rem">
      <h1>{props.item.categoryName}</h1>
      <div className="row">
      {
        props.item.items.map((item, index) => {
          return <Item key={index} item={item} />;
        })
      }
      </div>
    </div>
  );
}

function RenderMenu(props) {
  return (
    <div className="row">
      {
        props.menuList.map(item => {
          return <Cate key={item.categoryId} item={item} />;
        })
      }
    </div>
  );
}
export default RenderMenu;
