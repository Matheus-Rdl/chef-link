import { useState } from "react";
import { Dialog } from "@mui/material";
import styles from "./platePopUp.module.css";

export default function PlatePopUp({ plateData, onClose, updatePlate }) {
  // Estados locais para cada campo editável
  const [name, setName] = useState(plateData.name);
  const [description, setDescription] = useState(plateData.description);
  const [price, setPrice] = useState(plateData.price);
  const authData = JSON.parse(localStorage.getItem("auth"));

  console.log(authData.user.admin);

  const handleUpdate = async () => {
    const updatedData = {
      name,
      description,
      price: Number(price), // garante que seja número
      imgUrl: plateData.imgUrl,
    };

    const result = await updatePlate(plateData._id, updatedData);
    if (result?.success) {
      onClose(); // fecha popup após atualizar
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className={styles.popUpDialog}>
      <div className={styles.popUpContainer}>
        <img src={plateData.imgUrl} alt={plateData.name} />
        <div className={styles.popUpContent}>
          {authData.user.admin ? (
            <>
              {/* Inputs editáveis */}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do prato"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Preço"
              />

              <button onClick={handleUpdate}>Atualizar</button>
            </>
          ) : (
            <>
              <h1>{name}</h1>
              <p>{description}</p>
              <h2>{price}</h2>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
}
