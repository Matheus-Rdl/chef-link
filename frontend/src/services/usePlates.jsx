import { useState } from "react";

export default function usePlates() {
  const [platesLoading, setPlatesLoading] = useState(false);
  const [refetchPlates, setRefetchPlates] = useState(true);
  const [platesList, setPlatesList] = useState([]);

  const url = "http://localhost:3001/plates";

  // 🔹 Busca todos os pratos
  const getPlates = async () => {
    setPlatesLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      const result = await response.json();
      if (result.success) {
        setPlatesList(result.body || []);
      }
    } catch (error) {
      console.error("Erro ao buscar pratos:", error);
    } finally {
      setPlatesLoading(false);
      setRefetchPlates(false);
    }
  };

  // 🔹 Atualiza um prato existente
  const updatePlate = async (plateId, plateData) => {
    if (!plateId) {
      console.error("❌ Erro: plateId não foi informado em updatePlate");
      return;
    }

    try {
      setPlatesLoading(true);

      const response = await fetch(`${url}/${plateId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plateData),
      });

      const result = await response.json();

      if (result.success) {
        const updatedPlate =
          result.body?.value || result.body || result.value || null;

        if (updatedPlate) {
          setPlatesList((prev) =>
            prev.map((plate) =>
              plate?._id === plateId ? { ...plate, ...updatedPlate } : plate
            )
          );
        }

        await getPlates(); // garante sincronização
      }

      return result;
    } catch (error) {
      console.error("Erro ao atualizar prato:", error);
    } finally {
      setPlatesLoading(false);
    }
  };

  // 🔹 Adiciona um novo prato
  const addPlate = async (plateData) => {
    try {
      setPlatesLoading(true);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plateData),
      });

      const result = await response.json();

      if (result.success) {
        const newPlate =
          result.body?.inserted ||
          result.body?.value ||
          result.body ||
          result.value ||
          null;

        if (newPlate) {
          setPlatesList((prev) => [...prev, newPlate]);
        }

        await getPlates();
      }

      return result;
    } catch (error) {
      console.error("Erro ao adicionar prato:", error);
    } finally {
      setPlatesLoading(false);
    }
  };

  const deletePlate = async (plateId) => {
    try {
      const response = await fetch(`${url}/${plateId}`, { method: "DELETE" });
      const result = await response.json();
      if (result.success) {
        setPlatesList((prev) => prev.filter((p) => p._id !== plateId));
      }
      return result;
    } catch (error) {
      console.error("Erro ao deletar prato:", error);
    }
  };

  return {
    getPlates,
    platesLoading,
    refetchPlates,
    platesList,
    updatePlate,
    addPlate,
    deletePlate
  };
}
