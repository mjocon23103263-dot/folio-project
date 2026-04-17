// seedAdmin.js - BULLETPROOF VERSION
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    try {
      console.log('🔌 Database connected!');
      
      // Direct MongoDB collection access - NO User model!
      const db = mongoose.connection.db;
      const usersCollection = db.collection('users');
      
      // Check if admin exists
      const exists = await usersCollection.findOne({ email: 'admin@thefolio.com' });
      if (exists) {
        console.log('❌ Admin already exists!');
        process.exit(0);
      }

      // Create admin directly
      const hashedPassword = await bcrypt.hash('Admin@1234', 12);
      await usersCollection.insertOne({
        name: 'TheFolio Admin',
        email: 'admin@thefolio.com',
        password: hashedPassword,
        role: 'admin',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      console.log('✅ ADMIN CREATED SUCCESSFULLY!');
      console.log('📧 admin@thefolio.com');
      console.log('🔑 y');
      process.exit(0);
    } catch (error) {
      console.error('❌ ERROR:', error.message);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });