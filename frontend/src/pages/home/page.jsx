import { useState } from "react";
import styles from "./page.module.css";
import OrderPopUp from "../../components/orderPopUp/orderPopUp";
import SelectTablePopUp from "../../components/selectTablePopUp/selectTablePopUp";
import NavSideBar from "../../components/navSideBar/navSideBar";

export default function Home() {
  const [selectTable, setSelectTable] = useState(null);

  const handleSelectTable = () => {
    setSelectTable(true);
  };

  const handleClosePopUp = () => {
    setSelectTable(null);
  };

  return (
    <div className={`pageContainer`}>
      <>
        <NavSideBar/>
        <h1>Home</h1>
        <button
          onClick={() => {
            handleSelectTable();
          }}
        >
          Novo Pedido
        </button>

        {selectTable ? (
          <SelectTablePopUp onClose={handleClosePopUp}/>
        ) : null}
      </>
    </div>
  );
}
