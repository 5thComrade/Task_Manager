const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const { compareSync } = require("bcryptjs");

const router = new express.Router();

//Get all tasks when page reloaded
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      owner: req.user._id,
    });
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Create new task
router.post("/", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete Task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.status(202).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
