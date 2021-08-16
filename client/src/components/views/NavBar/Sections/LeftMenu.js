import React from 'react';
import { Menu, Badge } from 'antd';
import CartPage from '../../CartPage/CartPage';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  ShoppingOutlined
} from '@ant-design/icons';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
  <Menu mode={props.mode}>
    <Menu.Item key="Home" style={{paddingLeft:'40px', paddingRight:'40px'}}>
      <a href="/"><HomeOutlined /></a>
    </Menu.Item>
    <Menu.Item key="Item" style={{paddingLeft:'40px', paddingRight:'40px'}}>
      <a href="/product/item"><ShoppingOutlined /></a>
    </Menu.Item>
    <Menu.Item key="Cart" style={{paddingLeft:'40px', paddingRight:'40px'}}>
      <Badge count={5} size="small">
        <a href="/user/cart"><ShoppingCartOutlined /></a>
      </Badge>
    </Menu.Item>
    <Menu.Item key="More" style={{paddingLeft:'40px', paddingRight:'40px'}}>
      <a href="/"><MenuOutlined /></a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu