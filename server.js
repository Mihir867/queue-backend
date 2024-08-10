
import express from 'express';
import { createUser, findUserByEmail } from './src/models/userModel.js';
import { PrismaClient } from '@prisma/client';
import client from "prom-client";


import { authenticate } from './src/middleware/authMiddleware.js';
import { handleRequest } from './src/controllers/queueControllers.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { allocateUser, toggleAstrologerFlow } from './src/controllers/flowController.js';
import { activeRequestsGauge, requestCountMiddleware } from './src/metrics/requestCounts.js';

const app = express();
app.use(express.json());
app.use(requestCountMiddleware);


const prisma = new PrismaClient();
export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

app.get('/metrics', async (req, res) => {
  try {
      const metrics = await client.register.metrics();
      res.set('Content-Type', client.register.contentType);
      res.end(metrics);
  } catch (err) {
      res.status(500).end(err);
  }
});

app.post('/register', register);
app.post('/login', login);

app.post('/request', authenticate, handleRequest);
app.post('/allocate-user', authenticate, allocateUser);
app.put('/toggle-astrologer/:id', authenticate, toggleAstrologerFlow);

app.post('/astrologers', async (req, res) => {
  try {
    const { name } = req.body;
    const astrologer = await prisma.astrologer.create({
      data: {
        name,
      },
    });
    res.status(201).json(astrologer);
  } catch (error) {
    console.error('Error creating astrologer:', error);
    res.status(500).json({ error: 'Error creating astrologer' });
  }
});

app.post('/flows', async (req, res) => {
  try {
    const { astrologerId } = req.body;

    if (!astrologerId) {
      return res.status(400).json({ error: 'Astrologer ID is required' });
    }

    const flow = await prisma.flow.create({
      data: {
        astrologerId,
      },
    });

    res.status(201).json(flow);
  } catch (error) {
    console.error('Error creating flow:', error);
    res.status(500).json({ error: 'Error creating flow' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;