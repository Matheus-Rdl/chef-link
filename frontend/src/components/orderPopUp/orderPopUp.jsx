import { useState } from "react";
import styles from "./orderPopUp.module.css";
import { Dialog, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useTable from "../../services/useTable";

export default function OrderPopUp({ table, onClose }) {
  const navigate = useNavigate();
  const { AddTable } = useTable();
  const [errorMsg, setErrorMsg] = useState("");
  const authData = JSON.parse(localStorage.getItem("auth"));

  const [formData, setFormData] = useState({
    mesa: table,
    quant_pessoas: "",
  });

  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const newTable = await AddTable(
        authData.user._id,
        formData.mesa,
        formData.quant_pessoas
      );

      navigate("/new-order", {
        state: {
          tableId: newTable.insertedId,
          table: formData.mesa,
          numPerson: formData.quant_pessoas,
        },
      });
    } catch (err) {
      setErrorMsg(err.message || "Erro ao criar mesa");
      //alert(err.message || "Não foi possível criar a mesa."); // ⚠️ Mostra a mensagem real do backend
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <div className={styles.popUpContainer}>
        <Snackbar
          open={!!errorMsg}
          autoHideDuration={3000}
          onClose={() => setErrorMsg("")}
          anchorOrigin={{
            vertical: "top", // 👈 posição vertical
            horizontal: "center", // 👈 posição horizontal
          }}
          sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#f44336", // cor de fundo
            color: "white",
            fontSize: "1rem",
            fontWeight: "bold",
            textAlign: "center",
            borderRadius: "12px",
            padding: "12px 24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            marginTop: "3em",
          },
        }}
        >
          <Alert severity="error">{errorMsg}</Alert>
        </Snackbar>
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
