import styles from "./plateCard.module.css";
import { imgProducts } from "../../../utils/config.js"

export default function PlateCard({ plateData }) {
  const showImgProducts = imgProducts()


  return (
    <>
      <div className={showImgProducts ? (`${styles.cardContainer}`) : (`${styles.cardContainerNoImg}`)}>
        {showImgProducts ? (
          <img src={plateData.imgUrl} alt={plateData.name} />
        ) : (
          ""
        )}
        <div className={styles.cardContent}>
          <h4>{plateData.name}</h4>
          <h4>R$ {plateData.price}</h4>
        </div>
      </div>
    </>
  );
}
