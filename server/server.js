require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);

let db;

async function startServer() {
  try {
    await client.connect();
    db = client.db('taskapp');

    console.log('Conectado ao MongoDB');

    app.listen(3000, '0.0.0.0', () => {
      console.log('Servidor rodando na porta 3000');
    });
  } catch (error) {
    console.log('Erro ao conectar ao MongoDB:', error);
  }
}

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login recebido:', email, password);

    let user = await db.collection('users').findOne({ email });

    if (!user) {
      const result = await db.collection('users').insertOne({
        email,
        password
      });

      user = {
        _id: result.insertedId,
        email,
        password
      };
    }

    res.json({
      userId: user._id.toString(),
      email: user.email
    });
  } catch (error) {
    console.log('Erro no login:', error);
    res.status(500).json({ error: 'Erro no login' });
  }
});

app.get('/tasks/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const tasks = await db.collection('tasks').find({ userId }).toArray();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const { userId, title, description, image } = req.body;

    const newTask = {
      userId,
      title,
      description,
      image,
      completed: false,
      createdAt: new Date()
    };

    const result = await db.collection('tasks').insertOne(newTask);

    res.json({
      ...newTask,
      _id: result.insertedId.toString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar tarefa' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection('tasks').updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    res.json({ message: 'Tarefa atualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection('tasks').deleteOne({
      _id: new ObjectId(id)
    });

    res.json({ message: 'Tarefa excluída' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
});

startServer();