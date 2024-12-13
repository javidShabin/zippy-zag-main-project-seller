import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/seller/register",
        data,
      });
      toast.success("Seller registered successfully");
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-[87vh] bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Sign Up
        </h2>

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your Restaurant ID"
          type="text"
          {...register("restaurantId", { required: true })}
        />
        {errors.restaurantId && (
          <span className="text-red-500 mb-4">Restaurant ID is required</span>
        )}

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
        />
        {errors.name && <span className="text-red-500 mb-4">Name is required</span>}

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <span className="text-red-500 mb-4">Email is required</span>}

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <span className="text-red-500 mb-4">Password is required</span>}

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Confirm Password"
          {...register("conformPassword", {
            required: true,
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
        />
        {errors.conformPassword && (
          <span className="text-red-500 mb-4">
            {errors.conformPassword.message}
          </span>
        )}

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="tel"
          placeholder="Phone"
          {...register("phone", {
            required: true,
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone must be 10 digits",
            },
          })}
        />
        {errors.phone && (
          <span className="text-red-500 mb-4">
            {errors.phone.message || "Phone is required"}
          </span>
        )}

        <p className="text-gray-500">
          Already have account?{" "}
          <Link to={"/log-in"}>
            <span className="text-orange-400">Login</span>
          </Link>
        </p>

        <input
          className="bg-orange-400 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-500 cursor-pointer w-[100px] transition duration-300 mt-2"
          type="submit"
          value="Sign Up"
        />
      </form>
    </div>
  );
}
