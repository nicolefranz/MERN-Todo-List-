const express = require("express");

const router = express.Router();

//GET - get the info 
router.get("/todos", (req, res) => {
    res.status(200).json({ mssg: "GET REQUEST TO /api/todos" });
});

//POST - create request 
router.post("/todos", (req, res) => {
    res.status(201).json({ mssg: "POST REQUEST TO /api/todos" });
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