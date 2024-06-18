const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("./database");

const getCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("todosdb").collection("todos");
    return collection;
}

//GET - get the info 
router.get("/todos", async (req, res) => {
    const collection = getCollection();
    const todos = await collection.find({}).toArray();

    res.status(200).json({ mssg: "GET REQUEST TO /api/todos" });
});

//POST - create request 
router.post("/todos", async (req, res) => {
    const collection = getCollection();
    const { todo } = req.body;

    const newTodo = await collection.insertOne({ todo, status: false });

    res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
});

//DELETE - delete the info
router.delete("/todos/:id", (req, res) => {
    res.status(200).json({ mssg: "DELETE REQUEST TO /api/todos/:id" });
});

//PUT - update the info 
router.put("/todos/:id", (req, res) => {
    res.status(200).json({ mssg: "PUT REQUEST TO /api/todos/:id" });
});

module.exports = router;