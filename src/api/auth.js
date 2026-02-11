import axios from "axios";

export const loginRequest = user => axios.post(`${import.meta.env.VITE_API_URL}/login`, user)
