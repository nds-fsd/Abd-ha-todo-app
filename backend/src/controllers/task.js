const {Router} =  require('express');
const Task = require('../schemas/taskschema')
const router =  Router();
// GET all tasks
router.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find({});
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // POST create new task
  router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
  
    try {
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // DELETE task
router.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
  
  // PUT mark task as completed or incompleted
  router.put('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { completed: req.body.completed },
        { new: true }
      );
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  exports.taskRouter = router;