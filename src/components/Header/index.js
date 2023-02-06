import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { Container, Cart } from './styles';
import logo2 from '../../assets/images/logo2.png';


export default function Header() {
  const cartSize = useSelector(state => state.cart.length);

  return (
    <Container>
      <Link to="/">
        <img src={logo2} alt="rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>My cart</strong>
          <span>{cartSize} items</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
}
