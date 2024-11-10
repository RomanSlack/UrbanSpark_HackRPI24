// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://0.0.0.0:8000/', // Set your base URL
  headers: {
    'Content-Type': 'application/json',
    // Add other common headers if needed
  },
});

export default instance;