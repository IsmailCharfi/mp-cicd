const router = require("express").Router();
const { Todo } = require("./model");

router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(
      todos.map((document) => {
        const { _id, ...rest } = document.toObject();
        return { id: _id, ...rest };
      })
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/todos", async (req, res) => {
  const { title } = req.body;

  try {
    await Todo.create({ title });
    res.json({ message: "Todo added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { completed, title } = req.body;

  try {
    await Todo.findByIdAndUpdate(id, { completed, title });
    res.json({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
