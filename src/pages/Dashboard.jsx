import React from "react";
import { useSelector } from "react-redux";
import "../assets/boxicons-2.0.7/css/table.css";
import { Link } from "react-router-dom";
import Button from "./../components/Button";
import { useHistory } from "react-router";

const Dashboard = () => {
  const order = useSelector((state) => state.order);
  const history = useHistory();
  const handleView = (id) => {
    history.push(`/bill/${id}`);
  };
  return (
    <div>
      <h1>QUẢN TRỊ ĐƠN HÀNG </h1>

      <table className="responstable">
        <tr>
          <th data-th="Driver details">
            <span>Mã đơn hàng</span>
          </th>
          <th>Tên tài khoản</th>
          <th>Tổng tiền</th>
          <th>Ngày đặt đơn</th>
          <th>Trạng thái</th>
          <th></th>
        </tr>
        {order.value?.map((o) => (
          <tr>
            <td>{o.id}</td>
            <td>{o.user.username}</td>
            <td>{o.total}</td>
            <td>{o.createdAt}</td>
            <td>{o.status}</td>
            <td>
              <button className="button-53" onClick={() => handleView(o.id)}>
                Xem chi tiết ...
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Dashboard;
