import { Mongo } from "../../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = 'tables'

export default class TablesDataAccess {
    async getTables(){
        const result = await Mongo.db
        .collection(collectionName)
        .find({})
        .toArray()

        return result
    }

    async addTable(tableData){
        const { items, ...tableDataRest } = tableData

        tableDataRest.userId = new ObjectId(tableDataRest.userId)
        
        const result = await Mongo.db
        .collection(collectionName)
        .insertOne(tableDataRest)

        return result
    }

    async deleteTable(tableId){
        const result = await Mongo.db
        .collection(collectionName)
        .findOneAndDelete({_id: new ObjectId(tableId) })

        return result
    }

    async updateTable(tableId, tableData){
            const result = Mongo.db
            .collection(collectionName)
            .findOneAndUpdate(
                {_id: new ObjectId(tableId) },
                { $set: tableData }    
            )
    
            return result
    }
}
