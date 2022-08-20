import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import Helmet from "../components/Helmet";
import CartItem from "../components/CartItem";
import Button from "../components/Button";
import { v4 as uuidv4 } from "uuid";

import productData from "../assets/fake-data/products";
import numberWithCommas from "../utils/numberWithCommas";
import { addOrder } from "../redux/order/orderSlide";
import { deleteCart } from "../redux/shopping-cart/cartItemsSlide";

const Cart = () => {
  const userCurrent = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cartItems.value);
  const history = useHistory();
  const dispatch = useDispatch();
  const [cartProducts, setCartProducts] = useState(
    productData.getCartItemsInfo(cartItems)
  );

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartProducts(productData.getCartItemsInfo(cartItems));
    setTotalPrice(
      cartItems?.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
    setTotalProducts(
      cartItems?.reduce((total, item) => total + Number(item.quantity), 0)
    );
  }, [cartItems]);

  const handleOrder = () => {
    const data = {
      id: uuidv4(),
      user: {
        id: userCurrent.value?.id,
        username: userCurrent.value?.username,
        phone: userCurrent.value?.phone,
        address: userCurrent.value?.address,
      },
      products: cartProducts,
      total: totalPrice,
      status: "Chờ xác nhận...",
      createdAt: new Date(),
    };
    dispatch(addOrder(data));
    dispatch(deleteCart());
    history.push("/order");
  };

  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>
              Bạn đang có {totalProducts ? totalProducts : 0} sản phẩm trong giỏ
              hàng
            </p>
            <div className="cart__info__txt__price">
              <span>Thành tiền:</span>{" "}
              <span>
                {totalPrice ? numberWithCommas(Number(totalPrice)) : 0}
              </span>
            </div>
          </div>
          <div className="cart__info__btn">
            <Button size="block" onClick={() => handleOrder()}>
              Đặt hàng
            </Button>
            <Link to="/catalog">
              <Button size="block">Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {cartProducts.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
