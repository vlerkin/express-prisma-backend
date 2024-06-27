const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = 6001;

app.use(bodyParser.json());

app.post('/note', async (req, res) => {
  const { note } = req.body;
  if (note.length > 30) {
    return res.status(400).send({ error: 'Note should be up to 30 characters' });
  }
  const newNote = await prisma.note.create({
    data: { note },
  });
  res.status(201).send(newNote);
});

app.get('/notes', async (req, res) => {
  const notes = await prisma.note.findMany();
  res.status(200).send(notes);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

