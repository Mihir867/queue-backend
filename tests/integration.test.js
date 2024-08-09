import request from 'supertest';
import app from "../server.js"
import { createUser, findUserByEmail } from '../src/models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../src/models/userModel.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken')


describe('User API Integration Tests', () => {
    it('should register a user', async () => {
        // Mock implementations
        findUserByEmail.mockResolvedValue(null);
        createUser.mockResolvedValue({ id: '1', email: 'test@example.com' });
        bcrypt.hash.mockResolvedValue('hashedpassword');
    
        // Make the request
        const res = await request(app)
          .post('/register')
          .send({
            email: 'test@example.com',
            password: 'password123',
          });
    
        // Log the response for debugging
        console.log('Response Status Code:', res.statusCode);
        console.log('Response Body:', res.body);
    
        // Assertions
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
      });
      it('should login a user', async () => {
        // Mock implementations
        findUserByEmail.mockResolvedValue({ id: '1', email: 'test@example.com', password: 'hashedpassword' });
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('fake-jwt-token');
    
        const res = await request(app)
          .post('/login')
          .send({
            email: 'test@example.com',
            password: 'password123',
          });
    
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
      });
});
