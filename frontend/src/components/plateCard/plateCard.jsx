import styles from "./plateCard.module.css";

export default function PlateCard({ plateData }) {

    return(
        <>
            <div className={styles.cardContainer}>
                <img src={plateData.imgUrl} alt={plateData.name}/>
                <div className={styles.cardContent}>
                    <h4>{plateData.name}</h4>
                    <h4>R$ {plateData.price}</h4>
                </div>
            </div>
        </>
    )
}
