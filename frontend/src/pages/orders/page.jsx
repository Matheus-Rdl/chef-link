import { useParams } from "react-router-dom";
import styles from "./page.module.css";
import { useEffect, useMemo } from "react";
import useOrder from "../../services/useOrder";
import NavSideBar from "../../components/navSideBar/navSideBar";
import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

export default function Orders() {
  const { tableId } = useParams();
  const { getUserOrders, orderLoading, refetchOrders, ordersList } = useOrder();
  const navigate = useNavigate(); //negação entre telas

  useEffect(() => {
    if (refetchOrders) {
      getUserOrders(tableId);
    }
  }, [refetchOrders]);

  // 📌 Calcular total de todas as orders
  const totalPrice = useMemo(() => {
    return ordersList.reduce((accOrder, order) => {
      return (
        accOrder +
        order.orderItems.reduce((accItem, item) => {
          return accItem + (item.itemDetails[0]?.price * item.quantity || 0);
        }, 0)
      );
    }, 0);
  }, [ordersList]);

  //Função para voltar a tela
  const handleBack = () => {
    navigate(-1);
  };

  //console.log(ordersList);

  return (
    <div className={`${styles.orderPageContainer} pageContainer`}>
      <FaRegArrowAltCircleLeft
        className={styles.arrowBack}
        onClick={handleBack}
      />
      <NavSideBar />
      <h1>Orders</h1>

      {/* Total geral */}
      <div className={styles.totalContainer}>
        <h3>Total: R$ {totalPrice}</h3>
      </div>

      {ordersList.length > 0 ? (
        <div className={styles.ordersContainer}>
          {ordersList.map((order) => (
            <div className={styles.orderCard} key={order._id}>
              <p>{order.createdAt}</p>
              {order.orderItems.map((items) => (
                <div key={items._id}>
                  <p>
                    <span className={styles.orderName}>
                      {items.itemDetails[0].name}
                    </span>
                    <span className={styles.orderPrice}>
                      R$ {items.itemDetails[0].price.toFixed(2)}
                    </span>
                    <span className={styles.orderQuantity}>
                      {items.quantity}x
                    </span>
                    <span className={styles.orderItemTotalPrice}>
                      R${" "}
                      {(items.itemDetails[0].price * items.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>Você não tem pedidos ainda!</p>
        </div>
      )}
    </div>
  );
}
