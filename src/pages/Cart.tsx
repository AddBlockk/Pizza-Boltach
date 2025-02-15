import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { CartItem, CartEmpty } from "../components";
import { selectCart } from "../redux/cart/selectors";
import { clearItems } from "../redux/cart/slice";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(selectCart);
  const MySwal = withReactContent(Swal);

  const totalCount = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

  const onClickClear = () => {
    Swal.fire({
      title: "Очистить корзину?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Да, очистить",
      cancelButtonText: "Отмена",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearItems());
        Swal.fire("Корзина очищена!", "Все товары удалены.", "success");
      }
    });
  };

  const handlePayment = () => {
    MySwal.fire({
      title: "Оплата...",
      text: "Пожалуйста, подождите",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      MySwal.fire({
        title: "Покупка успешна!",
        text: `Ваш заказ на сумму ${totalPrice} ₽ оплачен.`,
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
      dispatch(clearItems());
    });
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">🛒 Корзина</h2>
          <div
            onClick={onClickClear}
            className="cart__clear"
            style={{ cursor: "pointer" }}
          >
            🗑 Очистить корзину
          </div>
        </div>
        <div className="content__items">
          {items.map((item: any) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всего товаров: <b>{totalCount} шт.</b>
            </span>
            <span>
              Сумма заказа: <b>{totalPrice} ₽</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline go-back-btn">
              🔙 Вернуться назад
            </Link>
            <div
              className="button pay-btn"
              onClick={handlePayment}
              style={{ cursor: "pointer" }}
            >
              💳 Оплатить сейчас
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
