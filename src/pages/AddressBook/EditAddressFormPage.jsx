import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "@/schemas/schemas";
import useAddress from "@/hooks/useAddress";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditAddressFormPage() {
  const { editAddress, addresses } = useAddress();
  const { addressId } = useParams();
  const navigate = useNavigate();

  const editingAddress = addresses.find((address) => {
    return address.id === addressId;
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: { ...editingAddress },
  });

  const onSubmit = (data) => {
    console.log("✅ Valid data:", data);
    editAddress(data);
    navigate(-1);
  };

  const handleReset = () => {
    reset();
  };

  useEffect(() => {
    if (editingAddress) {
      reset(editingAddress);
    }
  }, [editingAddress, reset]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 w-full max-w-xl p-8 bg-white rounded-xl shadow-md"
      >
        <div>
          <input
            placeholder="Street"
            {...register("street")}
            className="border px-3 py-2 w-full rounded"
          />
          {errors.street && (
            <p className="text-red-500 text-sm">{errors.street.message}</p>
          )}
        </div>

        <div>
          <input
            placeholder="House No"
            {...register("houseNo")}
            className="border px-3 py-2 w-full rounded"
          />
          {errors.houseNo && (
            <p className="text-red-500 text-sm">{errors.street.message}</p>
          )}
        </div>

        <div>
          <input
            placeholder="City"
            {...register("city")}
            className="border px-3 py-2 w-full rounded"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        <div>
          <input
            placeholder="PinCode"
            {...register("pincode")}
            className="border px-3 py-2 w-full rounded"
          />
          {errors.pincode && (
            <p className="text-red-500 text-sm ">{errors.pincode.message}</p>
          )}
        </div>

        <div>
          <input
            placeholder="Country"
            {...register("country")}
            className="border px-3 py-2 w-full rounded"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>

        <div>
          <input
            placeholder="Phone"
            {...register("phone")}
            className="border px-3 py-2 w-full rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
        <div className="flex justify-between gap-4 pt-2">
          <button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
