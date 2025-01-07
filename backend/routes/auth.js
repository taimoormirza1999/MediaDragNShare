const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/User');
const { Query } = require('node-appwrite');
const {databases} = require('../appwrite');
const databaseId = '677c0e200012bf3855af';
const usersCollectionId = '677c2a2e003e0b8798f9';
const router = express.Router();
const {storage} = require('../appwrite');

const cors = require('cors');
// app.use(cors())
// Register Route
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await databases.createDocument(
          databaseId,
          usersCollectionId,
          'unique()', 
          {
            username,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
          }
        );
        res.status(201).json({ message: 'User registered successfully', user });
      } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
      }
    });

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
      console.log('Login attempt:', email);  // Debug input
  
      const result = await databases.listDocuments(databaseId, usersCollectionId, [
        Query.equal('email', email),
      ]);
  
      console.log('Query result:', result.documents);  // Debug query result
  
      if (result.documents.length > 0) {
        const user = result.documents[0];
        console.log('Found user:', user);  // Debug user object
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log('Password from request:', password);
        console.log('Password from database:', user.password);
        console.log('Password match result:', isPasswordCorrect);
  
        if (isPasswordCorrect) {
            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET is not defined');
              }
              const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });            return res.json({ message: 'Login successful', user, token });
        }
      }
  
      res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
      console.error('Error logging in:', error);  // Log full error
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  });
  
  // File upload route
  const multer = require('multer');
  const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit, adjust as needed
  });
  router.post('/upload', upload.single('file'), async (req, res) => {
    const { file } = req;
  
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    try {
      // Only uploading the file to Appwrite storage
      const fileUploaded = await storage.createFile(
        process.env.APPWRITE_STORAGE_BUCKET,
        'unique()',
        file.buffer
      );
  
      const fileUrl = `${process.env.APPWRITE_ENDPOINT}/v1/storage/buckets/${process.env.APPWRITE_STORAGE_BUCKET}/files/${fileUploaded.$id}/view`;
  
      res.status(200).json({
        message: 'File uploaded successfully',
        fileId: fileUploaded.$id,
        fileUrl,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'File upload failed', error: error.message });
    }
  });
  
  

  module.exports = router;