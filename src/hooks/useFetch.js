import { useState } from "react";
import axios from "axios";


export default function useFetch({ API_URL }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

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
        baseURL: API_URL,
        url,
        method,
        data,
        headers,
      });
      setLoading(false);
      setData(response.data);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { data, loading, error, request };
}
