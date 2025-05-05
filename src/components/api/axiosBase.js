import axios from 'axios'



const axiosBase_URL = axios.create({
  baseURL: "https://amazon-clone-backend-ten.vercel.app",
  timeout: 5000, // Add timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export {axiosBase_URL}