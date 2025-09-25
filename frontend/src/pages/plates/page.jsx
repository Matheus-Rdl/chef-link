import { useEffect } from "react";
import usePlates from "../../services/usePlates";
import styles from "./page.module.css";
import Loading from "../loading/page";
import PlateCard from "../../components/plateCard/plateCard";

export default function Plates() {
  const { getPlates, platesList, platesLoading, refetchPlates } = usePlates();

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

  ////console.log(platesList);

  return (
    <div className={`pageContainer`}>
      <div className={styles.cardPlatesBox}>
        {platesList.map((plate) => (
          <div key={plate._id} className={styles.cardContainer}>
            <PlateCard plateData={plate} />
          </div>
        ))}
      </div>
    </div>
  );
}
