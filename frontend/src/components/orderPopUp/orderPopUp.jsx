import { useState } from "react";
import styles from "./orderPopUp.module.css";
import { Dialog, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useTable from "../../services/useTable";

export default function OrderPopUp({table, onClose }) {
  const navigate = useNavigate();
  const { AddTable } = useTable();
  const authData = JSON.parse(localStorage.getItem("auth"));

  const [formData, setFormData] = useState({
    mesa: table,
    quant_pessoas: ""
  });

  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    AddTable(authData.user._id, formData.mesa, formData.quant_pessoas)
    // Navega para a página NewOrder com os dados
    navigate("/new-order", {
      state: {
        table: formData.mesa,
        numPerson: formData.quant_pessoas
      }
    });
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <div className={styles.popUpContainer}>
        <h2>Novo pedido</h2>
        <form onSubmit={handleSubmitForm}>
          <TextField
            required
            label="Mesa"
            type="text"
            name="mesa"
            value={formData.mesa}
            onChange={handleFormDataChange}
            margin="normal"
            fullWidth
          />
          <TextField
            required
            label="Quantidade de pessoas"
            type="number"
            name="quant_pessoas"
            value={formData.quant_pessoas}
            onChange={handleFormDataChange}
            margin="normal"
            fullWidth
          />
          <button type="submit" variant="contained" fullWidth>
            Continuar
          </button>
        </form>
      </div>
    </Dialog>
  );
}
