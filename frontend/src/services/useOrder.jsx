import { useState } from "react";

export default function useOrder() {
  const [orderLoading, setOrderLoading] = useState(false);
  const [refetchOrders, setRefetchOrders] = useState(true);
  const [ordersList, setOrdersList] = useState([]);

  const url = "http://localhost:3001/orders";

  const getUserOrders = (tableId) => {
    setOrderLoading(true);

    fetch(`${url}/${tableId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setOrdersList(result.body);
        } else {
          //console.log(result);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
        setOrderLoading(false);
        setRefetchOrders(false);
      });
  };

  const addOrder = (userId, tableId, orderData) => {
    setOrderLoading(true);
    console.log(tableId)

    // Monta só os campos necessários
    const items = orderData.map((item) => ({
      plateId: item.id,
      quantity: item.quantity,
    }));

    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userId: userId,
        pickupTime: "13:30-26/09/2025",
        tableId: tableId,
        items: items,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        //if (result.success) {
        //  setTablesList(result.body);
        //} else {
        console.log(result);
        //}
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setOrderLoading(false);
      });
  };

  return { getUserOrders, orderLoading, refetchOrders, ordersList, addOrder };
}
