import { Checkbox } from "@mui/material";
import styles from "./orderProductCard.module.css";

export default function OrderProductCard({ productData, checked, onToggle }) {
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
      <div className={styles.cardContainer}>
        <img src={productData.imgUrl} alt={productData.name} />
        <div className={styles.cardContent}>
          <h4>{productData.name}</h4>
          <h4>R$ {productData.price}</h4>
          <Checkbox
            sx={{
              width: 175,
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
