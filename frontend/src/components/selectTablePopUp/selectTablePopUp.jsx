import { Dialog } from "@mui/material";
import useTable from "../../services/useTable";
import { useEffect, useState } from "react";
import styles from "./selectTablePopUp.module.css";
import Loading from "../../pages/loading/page";
import OrderPopUp from "../orderPopUp/orderPopUp";
import { useNavigate } from "react-router-dom";

export default function SelectTablePopUp({ onClose }) {
  const navigate = useNavigate();
  const { getTablesList, tablesList, refetchTables, tableLoading } = useTable();
  const [newTable, setNewTable] = useState(null);
  const [tableSelected, setTableSelected] = useState("");

  useEffect(() => {
    if (refetchTables) {
      getTablesList();
    }
  }, [refetchTables]);

  if (tableLoading) {
    return <Loading />;
  }

  //Abre o novo produto sem criar uma mesa
  const openNewOrder = (table) => {
    // Navega para a página NewOrder com os dados
    navigate("/new-order", {
      state: {
        table: table.tableNumber,
        numPerson: table.quantity,
      },
    });
  };

  //Fecha e abre o PopUp de nova mesa
  const openPopUp = (table) => {
    setTableSelected(table);
    setNewTable(true);
  };
  const closePopUp = () => {
    setNewTable(null);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <div className={styles.popUpContainer}>
        <h1>Selecione uma Mesa</h1>
        {tablesList.length > 0 ? (
          <>
            <div className={styles.tablesContainer}>
              {tablesList.map((table) => (
                <div
                  onClick={() =>
                    openNewOrder(table)
                  }
                  className={styles.tableContainer}
                  key={table._id}
                >
                  <p>Mesa: {table.tableNumber}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>You do not have tables yet</div>
        )}
        {newTable ? (
          <OrderPopUp onClose={closePopUp} table={tableSelected} />
        ) : null}
        <button onClick={() => openPopUp("")}>Adicionar mesa</button>
      </div>
    </Dialog>
  );
}
