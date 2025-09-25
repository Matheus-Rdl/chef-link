import { useState } from "react";

export default function useTable() {
  const [tableLoading, setTableLoading] = useState(true);
  const [refetchTables, setRefetchTables] = useState(true);
  const [tablesList, setTablesList] = useState([]);

  const url = "http://localhost:3001/tables";

  const getTablesList = () => {
    setTableLoading(true);

    fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setTablesList(result.body);
        } else {
          //console.log(result);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  const AddTable = (userId, table, numPerson, tableData) => {
    setTableLoading(true);

    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userId: userId,
        tableNumber: table,
        quantity: parseInt(numPerson)
      })
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
        setTableLoading(false);
      });
  };

  return { getTablesList, tablesList, refetchTables, tableLoading, AddTable };
}
