import express from "express";
import TablesControllers from "../controllers/tables.js";

const tablesRouter = express.Router()

const tablesControllers = new TablesControllers()

tablesRouter.get('/', async(req, res) =>{
    const { success, statusCode, body } = await tablesControllers.getTables()

    res.status(statusCode).send({success, statusCode, body})
})


tablesRouter.post('/', async(req, res) => {
    const { success, statusCode, body } = await tablesControllers.addTable(req.body)

    res.status(statusCode).send({success, statusCode, body})
})

tablesRouter.delete('/:id', async(req, res) => {
    const { success, statusCode, body } = await tablesControllers.deleteTable(req.params.id)

    res.status(statusCode).send({success, statusCode, body})
})

tablesRouter.put('/:id', async(req, res) => {
    const { success, statusCode, body } = await tablesControllers.updateTable(req.params.id, req.body)

    res.status(statusCode).send({success, statusCode, body})
})

export default tablesRouter