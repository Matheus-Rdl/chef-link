import { useEffect, useState } from "react";
import usePlates from "../../services/usePlates";
import styles from "./page.module.css";
import Loading from "../loading/page";
import PlateCard from "../../components/plateCard/plateCard";
import NavSideBar from "../../components/navSideBar/navSideBar";
import PlatePopUp from "../../components/platePopUp/platePopUp";

export default function Plates() {
  const { getPlates, platesList, platesLoading, refetchPlates, updatePlate } =
    usePlates();
  const [plateSelected, setPlateSelected] = useState(null);


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

  //Aciona o PlatePopUp
  const handlePlateSelected = (plate) => {
    setPlateSelected(plate);
  };

  //Retorna o PlatePopUp para o versão null, padrão
  const handleClosePopUp = () => {
    setPlateSelected(null);
  };

  ////console.log(platesList);

  return (
    <div className={`pageContainer`}>
      <NavSideBar />
      <div className={styles.cardPlatesBox}>
        {platesList?.map((plate) =>
          plate ? (
            <div
              key={plate._id}
              className={styles.cardContainer}
              onClick={() => handlePlateSelected(plate)}
            >
              <PlateCard plateData={plate} />
            </div>
          ) : null
        )}
      </div>
      {/*Função responsavel para verificar se um prato foi selecionado*/}
      {plateSelected && plateSelected._id && (
        <PlatePopUp
          plateData={plateSelected}
          onClose={handleClosePopUp}
          updatePlate={updatePlate}
        />
      )}
    </div>
  );
}
