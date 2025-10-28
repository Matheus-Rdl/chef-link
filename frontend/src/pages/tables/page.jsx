import styles from "./page.module.css";
import useTable from "../../services/useTable";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavSideBar from "../../components/navSideBar/navSideBar";
import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import OrderPopUp from "../../components/orderPopUp/orderPopUp";

export default function Tables() {
  const { getTablesList, tablesList, refetchTables, tableLoading, AddTable } =
    useTable();
  const [newTable, setNewTable] = useState(null);
  const navigate = useNavigate(); //negação entre telas

  useEffect(() => {
    if (refetchTables) {
      getTablesList();
    }
  }, [refetchTables]);

  if (tableLoading) {
    return <h1>Loading...</h1>;
  }

  //Função para voltar a tela
  const handleBack = () => {
    navigate("/");
  };

  //Função para voltar a tela
  const handleNewTable = () => {
    setNewTable(!newTable);
  };

  ////console.log(tablesList);

  return (
    <div className={`${styles.tablePageContainer} pageContainer`}>
      <h1>Tables</h1>
      <FaRegArrowAltCircleLeft
        className={styles.arrowBack}
        onClick={handleBack}
      />
      <NavSideBar />
      {tablesList.length > 0 ? (
        <>
          <button onClick={handleNewTable}>Adicionar mesa</button>
          <div className={styles.tablesContainer}>
            {tablesList.map((table) => (
              <Link
                to={`/orders/${table._id}/${table.quantity}`}
                key={table._id}
              >
                <div className={styles.tableContainer}>
                  <p>Mesa: {table.tableNumber}</p>
                  <p>Quant. de pessoas: {table.quantity}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div>Você não tem mesas ainda!</div>
      )}
      {newTable && <OrderPopUp onClose={handleBack} />}
    </div>
  );
}
