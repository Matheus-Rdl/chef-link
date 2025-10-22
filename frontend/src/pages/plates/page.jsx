import { useEffect, useState } from "react";
import usePlates from "../../services/usePlates";
import styles from "./page.module.css";
import Loading from "../loading/page";
import PlateCard from "../../components/plateCard/plateCard";
import NavSideBar from "../../components/navSideBar/navSideBar";
import PlatePopUp from "../../components/platePopUp/platePopUp";
import { adminUser } from "../../../utils/config.js";
import PlateAddPopUp from "../../components/plateAddPopUp/plateAddPopUp.jsx";

export default function Plates() {
  const { getPlates, platesList, platesLoading, refetchPlates, updatePlate, addPlate, deletePlate } =
    usePlates();
  const [plateSelected, setPlateSelected] = useState(null);
  const [addPlatePopUp, setAddPlatePopUp] = useState(false);

  const userAdmin = adminUser();


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

    //Aciona o PlateAddPopUp
  const handleAddPlatePopUp = () => {
    setAddPlatePopUp(!addPlatePopUp);
  };

  ////console.log(platesList);

  return (
    <div className={`pageContainer`}>
      <NavSideBar />
      <h1>Cardápio</h1>
      {userAdmin ? (
        <div>
          <button className={styles.addPlate} onClick={() => handleAddPlatePopUp()}>Adicionar Prato</button>
        </div>
        ) : (
          ""
      )}
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
          deletePlate={deletePlate}
        />
      )}

      {/*Função responsavel para verificar se um prato vais er adicionado*/}
      {addPlatePopUp && (
        <PlateAddPopUp
          onClose={() => handleAddPlatePopUp()}
          addPlate={addPlate}
        />
      )}
    </div>
  );
}
