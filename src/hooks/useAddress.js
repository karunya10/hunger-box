import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

export default function useAddress() {
  const [user] = useAuthState(auth);
  const [addresses, setAddresses] = useState([]);
  const { request, loading, error } = useFetch();

  useEffect(() => {
    if (user) {
      fetchAddress();
    }
  }, [user]);

  const fetchAddress = async () => {
    const token = await user.getIdToken();
    const response = await request({
      url: `/addresses/${user.uid}.json?auth=${token}`,
    });
    const addressesArr = [];
    for (const key in response) {
      addressesArr.push({
        id: key,
        street: response[key].street,
        houseNo: response[key].houseNo,
        pincode: response[key].pincode,
        city: response[key].city,
        country: response[key].country,
        phone: response[key].phone,
      });
    }
    setAddresses(addressesArr);
  };

  const addAddress = async (address) => {
    const token = await user.getIdToken();
    const response = await request({
      url: `/addresses/${user.uid}.json?auth=${token}`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ ...address, uid: user.uid }),
    });
    fetchAddress();
  };

  const editAddress = async (address, addressId) => {
    const token = await user.getIdToken();
    const response = await request({
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
    const response = await request({
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
