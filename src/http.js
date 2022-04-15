import axios from "axios";

const API_URL = "https://kaidzen-server.herokuapp.com"
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

export default $api;