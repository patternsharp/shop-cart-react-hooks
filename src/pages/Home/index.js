import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { formatPrice } from '../../util/format';
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';

export default function Home() {
  const [products, setProducts] = useState([]);

  const amount = useSelector(state => state.cart.reduce((sumAmount, product) => {
    (sumAmount[product.id] = product.amount);

    return sumAmount;
  }, {}));

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProducts(id) {
    dispatch(CartActions.addToCartRequest(id));
  };

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
          <button type="button" onClick={() => handleAddProducts(product.id)}>
            <div>
              <MdShoppingCart size={16} color="#FFF" />
              {amount[product.id] || 0}
            </div>
            <span>Add to cart</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
