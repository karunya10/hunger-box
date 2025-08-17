import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_DATABASE_URL;

export default function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async ({
    url,
    method = "GET",
    data = null,
    headers = {},
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        url: `${API_URL}${url}`,
        method,
        data,
        headers,
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { request, loading, error };
}
