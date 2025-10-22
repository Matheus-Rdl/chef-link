import TablesDataAccess from './tablesDataAccess.js'
import { ok, serverError } from '../../helpers/httpResponse.js'

export default class TablesControllers {
    constructor() {
        this.dataAccess = new TablesDataAccess()
    }

    async getTables(){
        try {
            const tables = await this.dataAccess.getTables()
            return ok(tables)
        } catch (error) {
            return serverError(error)
        }
    }

    async getTableByNumber(tableNumber){
        try {
            const tables = await this.dataAccess.getTableByNumber(tableNumber)
            return ok(tables)
        } catch (error) {
            return serverError(error)
        }
    }

    async addTable(tableData){
        try {
            const { tableNumber } = tableData

             // Verifica se já existe uma mesa com o mesmo número
            const existingTable = await this.dataAccess.getTableByNumber(tableNumber)

            if (existingTable) {
                return {
                    success: false,
                    statusCode: 400,
                    body : { message : `A mesa ${tableNumber} já existe!`}
                }
            }

            // Se não existir, cria a nova mesa normalmente
            const result = await this.dataAccess.addTable(tableData)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
    
    async deleteTable(tableId){
        try {
            const result = await this.dataAccess.deleteTable(tableId)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    async updateTable(tableId, tableData){
        try {
            const result = await this.dataAccess.updateTable(tableId, tableData)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}