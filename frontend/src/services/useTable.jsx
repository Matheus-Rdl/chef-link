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

const AddTable = async (userId, table, numPerson) => {
  setTableLoading(true);

  try {
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userId: userId,
        tableNumber: table,
        quantity: parseInt(numPerson),
      }),
    });

    const result = await response.json();
    console.log("Resultado AddTable:", result);

    if (result.success) {
      return result.body; // 👈 agora retorna a mesa criada (com o _id)
    } else {
      throw new Error(result.message || "Erro ao criar mesa");
    }
  } catch (error) {
    console.error("Erro no AddTable:", error);
    throw error;
  } finally {
    setTableLoading(false);
  }
};


  return { getTablesList, tablesList, refetchTables, tableLoading, AddTable };
}
