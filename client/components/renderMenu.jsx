import React from 'react';

function Item(props) {
  return (
    <div>
      <h3>{props.item.userName}</h3>
    </div>
  );
}

function RenderMenu(props) {
  console.log('prop', props);
  return (
    <div>
      {
        props.menuList.map(item => {
          return <Item key={item.userId} item={item} />;
        })
      }
    </div>
  );
}

export default RenderMenu;
