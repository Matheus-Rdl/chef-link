import { useState } from "react";
import styles from "./page.module.css";
import OrderPopUp from "../../components/orderPopUp/orderPopUp";
import SelectTablePopUp from "../../components/selectTablePopUp/selectTablePopUp";
import NavSideBar from "../../components/navSideBar/navSideBar";
import { adminUser } from "../../../utils/config.js";

export default function Home() {
  const [selectTable, setSelectTable] = useState(null);
  const userAdmin = adminUser();

  const handleSelectTable = () => {
    setSelectTable(true);
  };

  const handleClosePopUp = () => {
    setSelectTable(null);
  };

  return (
    <div className={`pageContainer`}>
      <>
        <NavSideBar />
        <h1>Home</h1>
        <div className={styles.buttonsHome}>
          <button
            onClick={() => {
              handleSelectTable();
            }}
          >
            Novo Pedido
          </button>

          {userAdmin && (
            <div>
              <button>Relatórios</button>
            </div>
          )}
        </div>

        {selectTable ? <SelectTablePopUp onClose={handleClosePopUp} /> : null}
      </>
    </div>
  );
}
