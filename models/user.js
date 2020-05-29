'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String
  }, 
  image: {
    type: String, 
    default: './../public/images/defaultUserImage.svg'
  },
  phoneNumber: {
    type: String
  }
});

module.exports = mongoose.model('User', schema);
