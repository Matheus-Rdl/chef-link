import styles from "./page.module.css";
import useTable from "../../services/useTable";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Tables() {
  const { getTablesList, tablesList, refetchTables, tableLoading } = useTable();

  useEffect(() => {
    if (refetchTables) {
      getTablesList();
    }
  }, [refetchTables]);

  if (tableLoading) {
    return <h1>Loading...</h1>;
  }

  console.log(tablesList);

  return (
    <div className={`${styles.tablePageContainer} pageContainer`}>
      <h1>Tables</h1>
      {tablesList.length > 0 ? (
        <div className={styles.tablesContainer}>
          {tablesList.map((table) => (
            <Link to={`/orders/${table._id}`}>
              <div key={table._id} className={styles.tableContainer}>
                <p>Mesa: {table.tableNumber}</p>
                <p>Quant. de pessoas: {table.quantity}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>You do not have tables yet</div>
      )}
    </div>
  );
}
