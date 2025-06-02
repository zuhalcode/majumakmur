import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://api.scrabber.co.id/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
