import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const CreateMenu = () => {
  const [restaurantId, setRestaurantId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch seller's restaurant ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/seller/profile");
        setRestaurantId(response.data.restaurant);
      } catch (err) {
        console.error("Error fetching restaurant ID:", err);
        toast.error("Failed to fetch restaurant details");
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (formData) => {
    if (!restaurantId) {
      toast.error("Restaurant ID not found. Please try again.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("image", formData.image[0]);
    data.append("restaurantId", restaurantId);

    try {
      const response = await axiosInstance.post("/menu/create-menu", data);
      toast.success("Menu created successfully");
      console.log("Response:", response);
    } catch (error) {
      console.error("Error creating menu:", error);
      toast.error("Failed to create menu");
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Create Menu
        </h2>

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Item Name"
          {...register("name", { required: "Item Name is required" })}
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Category"
          {...register("category", { required: "Category is required" })}
        />
        {errors.category && <span className="text-red-500">{errors.category.message}</span>}

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="Price"
          {...register("price", { required: "Price is required" })}
        />
        {errors.price && <span className="text-red-500">{errors.price.message}</span>}

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="file"
          accept="image/*"
          {...register("image", { required: "Image is required" })}
        />
        {errors.image && <span className="text-red-500">{errors.image.message}</span>}

        <input
          className="bg-orange-400 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-500 cursor-pointer w-[100px] transition duration-300 mt-2"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default CreateMenu;
