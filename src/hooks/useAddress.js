import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const API_URL =
  "https://food-delivery-da806-default-rtdb.europe-west1.firebasedatabase.app";

export default function useAddress() {
  const [user] = useAuthState(auth);
  const [addresses, setAddresses] = useState([]);
  const { data, loading, error, request } = useFetch({ API_URL });

  useEffect(() => {
    if (user) {
      fetchAddress();
    }
  }, [user]);

  useEffect(() => {
    const addressesArr = [];
    for (const key in data) {
      addressesArr.push({
        id: key,
        street: data[key].street,
        houseNo: data[key].houseNo,
        pincode: data[key].pincode,
        city: data[key].city,
        country: data[key].country,
        phone: data[key].phone,
      });
    }
    setAddresses(addressesArr);
  }, [data]);

  const fetchAddress = async () => {
    const token = await user.getIdToken();
    await request({
      url: `/addresses/${user.uid}.json?auth=${token}`,
    });
  };

  const addAddress = async (address) => {
    const token = await user.getIdToken();
    await request({
      url: `/addresses/${user.uid}.json?auth=${token}`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ ...address, uid: user.uid }),
    });
    fetchAddress();
  };

  const editAddress = async (address, addressId) => {
    const token = await user.getIdToken();
    await request({
      url: `/addresses/${user.uid}/${addressId}.json?auth=${encodeURIComponent(
        token
      )}`,
      method: "PUT",
      data: JSON.stringify({ ...address, uid: user.uid }),
      headers: { "Content-Type": "application/json" },
    });

    fetchAddress();
  };

  const deleteAddress = async (addressId) => {
    const token = await user.getIdToken();
    await request({
      url: `/addresses/${user.uid}/${addressId}.json?auth=${token}`,
      method: "DELETE",
    });

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
