const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status, deadline } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        deadline: new Date(deadline),
        userId: req.userId,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({ where: { userId: req.userId } });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, deadline } = req.body;
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, description, status, deadline: new Date(deadline) },
    });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
