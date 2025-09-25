import styles from "./page.module.css";
import { useEffect, useState } from "react";
import usePlates from "../../services/usePlates";
import Loading from "../loading/page";
import { useLocation } from "react-router-dom";
import OrderProductCard from "../../components/orderProductCard/orderProductCard";

export default function NewOrder() {
  const { getPlates, platesList, platesLoading, refetchPlates } = usePlates();
  const location = useLocation();
  const { table, numPerson } = location.state || {};
  const [selectedItems, setSelectedItems] = useState([]);

  ////console.log(table, numPerson);

  //leva uma mensagem para o services, a função getAvailablePlates
  useEffect(() => {
    if (refetchPlates) {
      getPlates();
    }
  }, [refetchPlates]);

  //Ele carrega a pagina até encontrar os pratos
  if (platesLoading) {
    return <Loading />;
  }

  //Função que adiciona ou remove um item da lista
  const handleToggleProduct = (product) => {
    if (product.selected) {
      setSelectedItems((prev) => {
        const exists = prev.find((p) => p.id === product.id);
        if (exists) return prev; // já existe, não adiciona de novo
        return [...prev, { ...product, quantity: 1 }]; // adiciona com quantity = 1
      });
    } else {
      setSelectedItems((prev) => prev.filter((p) => p.id !== product.id));
    }
  };

  // Função para saber se o produto está selecionado
  const isChecked = (id) => selectedItems.some((item) => item.id === id);

  //Funções responsaveis para aumentar ou diminuir a quantidade dos pratos
  const increaseQuantity = (id) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const decreaseQuantity = (id) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) } // nunca deixa abaixo de 1
          : item
      )
    );
  };

  //COnfirma o pedido
  const handleConfirmOrder = (orderData) => {
    console.log(orderData)
    setSelectedItems([]);
  };

  return (
    <div className={`pageContainer`}>
      <h1>Novo pedido</h1>
      <div className={styles.newOrderInformation}>
        <h3>Mesa: {table}</h3>
        <h3>Pessoas: {numPerson}</h3>
      </div>
      <div>
        <div className={styles.cardProductsBox}>
          {platesList.map((productData) => (
            <div key={productData._id} className={styles.cardContainer}>
              <OrderProductCard
                key={productData._id}
                productData={productData}
                onToggle={handleToggleProduct}
                checked={isChecked(productData._id)}
              />
            </div>
          ))}
        </div>

        <div className={styles.cartContainer}>
          <h4>Produtos selecionados</h4>
          <ul className={styles.cartContent}>
            {selectedItems.length === 0 && <p>Nenhum item selecionado.</p>}
            {selectedItems.map((item, index) => (
              <li key={index}>
                <div className={styles.cartItemContent}>
                  <div>
                    {item.title}
                    <br />
                    <strong>R$ {item.price}</strong>
                  </div>
                  <div className={styles.cartQuantity}>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    {item.quantity}
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.cartButtons}>
            <button onClick={() => handleConfirmOrder(selectedItems)}>
              Lançar Pedido
            </button>
            <button>Ver lançamentos</button>
          </div>
        </div>
      </div>
    </div>
  );
}
