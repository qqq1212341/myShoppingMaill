import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="Home">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="Item">
      <a href="/product/item">Item</a>
    </Menu.Item>
    <Menu.Item key="Cart">
      <a href="/">Cart</a>
    </Menu.Item>
    <Menu.Item key="More">
      <a href="/">More</a>
    </Menu.Item>
    {/* <SubMenu key="sub" title={<span>Blogs</span>}>
      <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu> */}
  </Menu>
  )
}

export default LeftMenu