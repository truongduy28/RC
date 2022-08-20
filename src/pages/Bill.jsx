/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useParams } from "react-router-dom";
import "../assets/boxicons-2.0.7/css/bill.css";
import { useSelector } from "react-redux";
import numberWithCommas from "../utils/numberWithCommas";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { updateOrder } from "../redux/order/orderSlide";

const Bill = () => {
  let { id } = useParams();
  const order = useSelector((state) => state.order);
  const orderCurrent = order.value?.find((od) => od.id === id);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // console.log(orderCurrent);
  const handleShipping = ({ action, payload }) => {
    if (action === "cancel") {
      dispatch(updateOrder(payload));
    } else if (action === "shipping") {
      dispatch(updateOrder(payload));
    } else if (action === "done") {
      dispatch(updateOrder(payload));
    }
  };

  return (
    <div className="bill">
      <article class="card">
        <div class="card__thumb">
          <a href="#">
            <img src="https://images.unsplash.com/photo-1512466699224-9d8217244131?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4b6f389eb54cb8e27ee8ee5d4040a5d7&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb" />
          </a>
        </div>

        <div class="card__body">
          <div class="card__category">
            <a href="#">Mã đơn: {orderCurrent?.id}</a>
          </div>
          <div class="card__title">
            <a href="#">Tổng tiền: {numberWithCommas(orderCurrent?.total)}đ</a>
          </div>
          <div class="card__subtitle">{orderCurrent?.status}</div>
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                style={{ width: "25px" }}
                src="http://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png"
              />
              <h4>{orderCurrent.user.username}</h4>
            </div>

            <p>Địa chỉ: {orderCurrent.user.address}</p>
            <p>Số điện thoại: {orderCurrent.user.phone}</p>
          </div>
          <div>
            {orderCurrent.products?.map((item) => (
              <div className="cart__item">
                <div className="cart__item__image">
                  <img src={item.product.image01} alt="" />
                </div>
                <div className="cart__item__info">
                  <div className="cart__item__info__name">
                    {`${item.product.title} - ${item.color} - ${item.size}`}
                  </div>
                  <div className="cart__item__info__price">
                    {numberWithCommas(item.price)}đ
                  </div>
                  <div className="cart__item__info__quantity">
                    {item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bill-btn">
          {orderCurrent.status === "Chờ xác nhận..." ? (
            user.value?.isAdmin ? (
              <>
                {" "}
                <Button
                  onClick={() =>
                    handleShipping({
                      action: "shipping",
                      payload: {
                        id: orderCurrent.id,
                        status: "Đang giao hàng...",
                      },
                    })
                  }
                  backgroundColor="main"
                  gtfr
                  icon="bx bx-cart"
                  animate={true}
                >
                  Giao hàng
                </Button>
                <Button
                  onClick={() =>
                    handleShipping({
                      action: "cancel",
                      payload: {
                        id: orderCurrent.id,
                        status: "Đã hủy",
                      },
                    })
                  }
                  backgroundColor="pink"
                  icon="bx bx-x"
                  animate={true}
                >
                  Hủy đơn
                </Button>
              </>
            ) : (
              <Button
                onClick={() =>
                  handleShipping({
                    action: "cancel",
                    payload: {
                      id: orderCurrent.id,
                      status: "Đã hủy",
                    },
                  })
                }
                backgroundColor="pink"
                icon="bx bx-x"
                animate={true}
              >
                Hủy đơn
              </Button>
            )
          ) : user.value?.isAdmin ? (
            orderCurrent.status === "Đang giao hàng..." ? (
              <Button
                onClick={() =>
                  handleShipping({
                    action: "done",
                    payload: {
                      id: orderCurrent.id,
                      status: "Đã giao",
                    },
                  })
                }
                backgroundColor="pink"
                icon="bx bx-x"
                animate={true}
              >
                Hoàn thành
              </Button>
            ) : null
          ) : null}

          {user.value?.isAdmin && <></>}
        </div>
      </article>
    </div>
  );
};

export default Bill;
