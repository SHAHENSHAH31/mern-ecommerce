// export const Base_URL = 'https://e-backend-eh6t.onrender.com';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // your backend base URL
  withCredentials: true, // 🔥 send cookies with every request
});

export default instance;