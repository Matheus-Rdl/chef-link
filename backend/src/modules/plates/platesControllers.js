import PlatesDataAccess from "./platesDataAccess.js";
import { ok, serverError } from "../../helpers/httpResponse.js";
//import { } from "../../../public/imgs/noimg.png"

export default class PlatesControllers {
  constructor() {
    this.dataAccess = new PlatesDataAccess();
  }

  async getPlates() {
    try {
      const plates = await this.dataAccess.getPlates();
      return ok(plates);
    } catch (error) {
      return serverError(error);
    }
  }

  async getAvailablePlates() {
    try {
      const plates = await this.dataAccess.getAvailablePlates();
      return ok(plates);
    } catch (error) {
      return serverError(error);
    }
  }

  async deletePlate(plateId) {
    try {
      const result = await this.dataAccess.deletePlate(plateId);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  async addPlate(plateData) {
    try {
      // 🔹 Garante que sempre exista uma imagem válida
      if (!plateData.imgUrl || plateData.imgUrl.trim() === "") {
        // Pode ser uma imagem local ou uma hospedada (recomendo uma pública)
        plateData.imgUrl = "../../../public/imgs/plates/noimg.png";
      }

      const result = await this.dataAccess.addPlate(plateData);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  async updatePlate(plateId, plateData) {
    try {
      // Garante que sempre exista uma imagem válida
      if (!plateData.imgUrl || plateData.imgUrl.trim() === "") {
        plateData.imgUrl = "../../../public/imgs/plates/noimg.png";
      }

      const result = await this.dataAccess.updatePlate(plateId, plateData);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}
