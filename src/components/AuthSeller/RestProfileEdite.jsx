import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";

const RestProfileEdit = (props) => {
  const restaurantId = props.restDetails.id;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    if (props.restDetails.image) {
      setImagePreview(props.restDetails.image);
    }
  }, [props.restDetails]);

  // Handle form submission for profile update
  const onSubmit = async (formData) => {
    const data = new FormData();

    // Only append fields that have changed
    if (formData.name !== props.restDetails.name) {
      data.append("name", formData.name);
    }

    if (formData.image && formData.image[0]) {
      data.append("image", formData.image[0]);
    }

    if (data.size === 0) {
      setError("No changes detected.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.put(
        `/restaurant/update-restaurant/${restaurantId}`,
        data
      );
      setIsLoading(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(null), 5000); // Hide success message after 5 seconds
    } catch (err) {
      setIsLoading(false);
      setError("Failed to update profile. Please try again.");
      setTimeout(() => setError(null), 5000); // Hide error message after 5 seconds
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue("image", file ? [file] : []);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col"
      >
        <label className="mb-1 font-medium text-gray-700">Name</label>
        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="text"
          placeholder="Restaurant name"
          defaultValue={props.restDetails.name}
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}

        <label className="mb-1 font-medium text-gray-700">Profile Image</label>
        <input
          type="file"
          className="mb-4"
          accept="image/*"
          onChange={handleImageChange}
          {...register("image")}
        />
        {errors.image && (
          <span className="text-red-500">{errors.image.message}</span>
        )}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Image preview"
            className="mb-4 w-32 h-32 object-cover"
          />
        )}

        {error && <span className="text-red-500">{error}</span>}
        {successMessage && (
          <span className="text-green-500">{successMessage}</span>
        )}

        <input
          type="submit"
          value={isLoading ? "Updating..." : "Update Profile"}
          className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 cursor-pointer w-full transition duration-300"
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default RestProfileEdit;
