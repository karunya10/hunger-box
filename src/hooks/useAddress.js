import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
const API_URL = import.meta.env.VITE_DATABASE_URL;

export default function useAddress() {
  const [user] = useAuthState(auth);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAddress = async () => {
    setLoading(true);
    try {
      const token = await user.getIdToken();

      const response = await axios.get(
        `${API_URL}/addresses/${user.uid}.json?auth=${token}`
      );
      if (response.status !== 200) {
        throw new Error("Failed to Fetch Locations");
      }
      const addressesArr = [];
      for (const key in response.data) {
        addressesArr.push({
          id: key,
          street: response.data[key].street,
          houseNo: response.data[key].houseNo,
          pincode: response.data[key].pincode,
          city: response.data[key].city,
          country: response.data[key].country,
          phone: response.data[key].phone,
        });
      }
      setAddresses(addressesArr);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      console.log("🚀 ~ useAddress ~ user:", user);

      fetchAddress();
    }
  }, [user]);

  const addAddress = async (address) => {
    const token = await user.getIdToken();
    const response = await fetch(
      `${API_URL}/addresses/${user.uid}.json?auth=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...address, uid: user.uid }),
      }
    );
    if (!response.ok) throw new Error("Failed to add address.");
    fetchAddress();
  };

  const editAddress = async (address, addressId) => {
    try {
      const token = await user.getIdToken();
      const response = await fetch(
        `${API_URL}/addresses/${
          user.uid
        }/${addressId}.json?auth=${encodeURIComponent(token)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...address, uid: user.uid }),
        }
      );
      if (!response.ok) throw new Error("Failed to add recipe.");
      fetchAddress();
    } catch (e) {
      console.log(e);
    }
  };
  const deleteAddress = async (addressId) => {
    const token = await user.getIdToken();
    const response = await fetch(
      `${API_URL}/addresses/${user.uid}/${addressId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) throw new Error("Failed to delete Address.");

    fetchAddress();
  };

  return {
    fetchAddress,
    addAddress,
    editAddress,
    deleteAddress,
    addresses,
    loading,
    error,
  };
}
