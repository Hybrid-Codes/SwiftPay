import express from "express";
import db from '../db/conn.mjs';
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all the records.
router.get("/", async (req, res) => {
    let collection = await db.collection("fruit");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
});

// Create a new record.
router.post("/", async (req, res) => {
    let newDocument = {
        name: req.body.name,
        comment: req.body.comment
    };
    let collection = await db.collection("fruit");
    let result = await collection.insertOne(newDocument);
    res.status(201).send(result);
});

// Update a record by id
router.patch("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
        $set: {
            name: req.body.name,
            comment: req.body.comment
        }
    };

    let collection = await db.collection("fruit");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});

// Gets a single record by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("fruit");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Delete a record
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("fruit");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

export default router;
