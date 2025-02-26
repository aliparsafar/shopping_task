import axios from "axios";

const baseURL = import.meta.env.VITE.API.BASE.URL

export const client= axios.create({
    baseURL
})