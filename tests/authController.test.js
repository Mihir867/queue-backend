import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { register, login } from '../server.js';
import { createUser, findUserByEmail } from '../src/models/userModel.js';

jest.mock('../src/models/userModel.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller - Register', () => {
      it('should register a new user', async () => {
    createUser.mockResolvedValue({ id: '1', email: 'test@example.com' });
    findUserByEmail.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedpassword');

    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await register(req, res);

    expect(findUserByEmail).toHaveBeenCalledWith('test@example.com');
    expect(createUser).toHaveBeenCalledWith({ email: 'test@example.com', password: 'hashedpassword' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully', user: { id: '1', email: 'test@example.com' } });
  });

  it('should return 400 if user already exists', async () => {
    findUserByEmail.mockResolvedValue({ id: '1', email: 'existing@example.com' });

    const req = {
      body: {
        email: 'existing@example.com',
        password: 'password123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
  });
});

describe('Auth Controller - Login', () => {
  it('should login a user', async () => {
    findUserByEmail.mockResolvedValue({ id: '1', email: 'test@example.com', password: 'hashedpassword' });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('fake-jwt-token');

    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, res);

    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedpassword');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'fake-jwt-token' });
  });

  it('should return 400 if credentials are invalid', async () => {
    findUserByEmail.mockResolvedValue(null);

    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });
});
