const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("./database");
const { ObjectId } = require("mongodb");

const getCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("todosdb").collection("todos");
    return collection;
}

//GET - get the info 
router.get("/todos", async (req, res) => {
    const collection = getCollection();
    const todos = await collection.find({}).toArray();

    res.status(200).json(todos);
});

//POST - create request 
router.post("/todos", async (req, res) => {
    const collection = getCollection();
    const { todo } = req.body;

    if (!todo){
        return res.status(400).json({ mssg: "error no to do found"});
    }

    todo = JSON.stringify(todo);

    const newTodo = await collection.insertOne({ todo, status: false });

    res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
});

//DELETE - delete the info
router.delete("/todos/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);

    const deleteTodo = await collection.deleteOne({ _id });

    res.status(200).json(deleteTodo);
});

//PUT - update the info 
router.put("/todos/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const { status } = req.body;

    if (typeof status !== "boolean"){
        return res.status(400).json({ mssg: "invalid status"});
    }

    const updateTodo = await collection.updateOne({ _id }, { $set: { status: !status }}); 


    res.status(200).json(updateTodo);
});

module.exports = router;