import axios from "axios";

const URLAPI = "http://localhost:4000/api";


export const registerRequest = async (user) => {
    return await axios.post(`${URLAPI}/register`, user);
}