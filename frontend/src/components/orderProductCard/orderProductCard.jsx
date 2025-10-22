import { Checkbox } from "@mui/material";
import styles from "./orderProductCard.module.css";
import { imgProducts } from "../../../utils/config.js"

export default function OrderProductCard({ productData, checked, onToggle }) {
  const showImgProducts = imgProducts()

  const handleChange = (e) => {
    //Manda para o NewOrders.jsx o item que foi marcado ou desmarcado
    onToggle({
      id: productData._id, // identifica o produto
      title: productData.name,
      price: productData.price,
      selected: e.target.checked,
    });
  };

  return (
    <>
      <div className={showImgProducts ? (`${styles.cardContainer}`) : (`${styles.cardContainerNoImg}`)}>
        {showImgProducts ? (
          <img src={productData.imgUrl} alt={productData.name} />
        ) : (
          ""
        )}
        <div className={styles.cardContent}>
          <h4>{productData.name}</h4>
          <h4>R$ {productData.price}</h4>
          <Checkbox
            sx={{
              width: 50,
              height: 50,
              "& .MuiSvgIcon-root": { fontSize: 42 },
              color: "#fff", // cor do box quando desmarcado
              "&.Mui-checked": {
                color: "#ff5722", // cor do box quando marcado
              },
            }}
            checked={checked}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}
