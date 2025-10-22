import { useState } from "react";
import { Dialog } from "@mui/material";
import styles from "./plateAddPopUp.module.css";
import { adminUser, imgProducts } from "../../../utils/config.js";
import { convertToBase64 } from "../../../utils/converter.js";

export default function PlateAddPopUp({ onClose, addPlate }) {
  // Estados locais para cada campo editável
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const userAdmin = adminUser();
  const showImgProducts = imgProducts();

  const handleAdd = async () => {
    let imgUrl = "";

    if (imageFile) {
      imgUrl = await convertToBase64(imageFile);
    } else {
      imgUrl = "";
    }

    const addData = {
      name,
      description,
      price: Number(price),
      imgUrl,
    };

    const result = await addPlate(addData);
    if (result?.success) onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} className={styles.popUpDialog}>
      <div className={styles.popUpContainer}>
        {showImgProducts && (
          <div>
            {imageFile && (
              <img src={URL.createObjectURL(imageFile)} alt="Preview" />
            )}
          </div>
        )}
        <div className={styles.popUpContent}>
          {userAdmin ? (
            <>
              {/* Inputs editáveis */}
              {showImgProducts && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              )}

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
              <button onClick={handleAdd}>Adicionar</button>
              {/*
              <button onClick={handleUpdate}>Atualizar</button>
                <button onClick={handleDelete}>Deletar</button>
              */}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Dialog>
  );
}
