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
        // Compatibilidade com diferentes formatos de resposta
        const updatedPlate =
          result.body?.value || result.body || result.value || null;

        if (updatedPlate) {
          // Atualiza o estado local imediatamente
          setPlatesList((prev) =>
            prev.map((plate) =>
              plate && plate._id === plateId
                ? { ...plate, ...updatedPlate }
                : plate
            )
          );
        }

        // Garante que a lista fique sincronizada com o banco
        await getPlates();
      }

      return result;
    } catch (error) {
      console.error("Erro ao atualizar prato:", error);
    } finally {
      setPlatesLoading(false);
    }
  };

  return { getPlates, platesLoading, refetchPlates, platesList, updatePlate };
}
