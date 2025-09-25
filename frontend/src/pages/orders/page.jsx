import { useParams } from "react-router-dom";
import styles from "./page.module.css";
import { useEffect } from "react";
import useOrder from "../../services/useOrder";

export default function Orders() {
  const { tableId } = useParams();
  const { getUserOrders, orderLoading, refetchOrders, ordersList } = useOrder();

  useEffect(() => {
    if (refetchOrders) {
      getUserOrders(tableId);
    }
  }, [refetchOrders]);

  ////console.log(ordersList);

  return (
    <div className={`${styles.orderPageContainer} pageContainer`}>
      <h1>Orders</h1>
      <h4>{tableId}</h4>
      {ordersList.length > 0 ? (
        <div className={styles.ordersContainer}></div>
      ) : (
        <div>
          <p>You do not have orders yet</p>
        </div>
      )}
    </div>
  );
}
